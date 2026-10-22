import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { CONSENT_MARKETING, CONSENT_SMS, leadSubmitSchema, type LeadSubmit } from "./lead-schema";

const PLAN_NAMES = { receptionist: "Receptionist", pro: "Pro", full: "Full Team" } as const;

async function forwardLead(url: string, payload: unknown) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) return true;
      console.error(`forward-lead attempt ${attempt} failed with status ${res.status}`);
    } catch (e) {
      console.error(`forward-lead attempt ${attempt} error`, e);
    }
  }
  return false;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: LeadSubmit) => leadSubmitSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const db = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const anyConsent = data.consent_sms_account || data.consent_marketing;
    const consentText = [data.consent_sms_account && CONSENT_SMS, data.consent_marketing && CONSENT_MARKETING].filter(Boolean).join("\n\n");
    const lead = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      name: data.name,
      business_name: data.business_name,
      email: data.email,
      phone: data.phone,
      website: data.website || null,
      locations: data.locations,
      software: data.software || null,
      problems: data.problems,
      pain_ids: data.pain_ids,
      sample_questions: data.sample_questions.filter(Boolean),
      niche: "medical-practices",
      consent_sms_account: data.consent_sms_account,
      consent_marketing: data.consent_marketing,
      consent_text: anyConsent ? consentText : null,
      consent_at: anyConsent ? new Date().toISOString() : null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      ref_code: data.ref_code || null,
      plan: data.plan,
      billing: data.billing,
      status: "new",
    };
    const { error } = await db.from("leads").insert(lead);
    if (error) {
      console.error("lead insert failed", error);
      return { ok: false as const, error: "We couldn't save your details. Please try again." };
    }

    const webhook = process.env["GHL_WEBHOOK_URL"];
    if (!webhook) {
      console.error("forward-lead skipped: GHL_WEBHOOK_URL is not set");
    } else {
      const tags = ["lovable-funnel", "medical-practices", "free-trial", ...(lead.ref_code ? ["affiliate"] : [])];
      await forwardLead(webhook, { ...lead, plan_name: PLAN_NAMES[data.plan], tags });
    }
    return { ok: true as const };
  });
