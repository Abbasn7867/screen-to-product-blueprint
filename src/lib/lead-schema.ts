import { z } from "zod";

export const CONSENT_SMS =
  "I agree to receive text messages and calls, including automated and AI-assisted calls, from AI Solution Company at the number provided about my free trial, account setup and service notices. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.";
export const CONSENT_MARKETING =
  "Yes, send me offers and product updates from AI Solution Company by text and email. Reply STOP or unsubscribe anytime.";

const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

/** Formats digits as a US phone number: (555) 555-5555 */
export function formatUSPhone(input: string) {
  const d = input.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (d.length < 4) return d.length ? `(${d}` : "";
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export const step1Schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  business_name: z.string().trim().min(1, "Please enter your practice name").max(150),
  email: z.string().trim().email("Please enter a valid work email").max(255),
  phone: z.string().trim().regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a 10-digit US mobile number"),
  website: opt(255),
});
export const step2Schema = z.object({
  locations: z.string().trim().min(1, "Please choose how many locations you have").max(20),
  software: opt(150),
  problems: z.array(z.string().max(80)).max(20),
});
export const step3Schema = z.object({
  sample_questions: z.array(z.string().trim().max(200)).max(3),
});
export const step4Schema = z.object({
  consent_sms_account: z.boolean(),
  consent_marketing: z.boolean(),
  plan: z.enum(["receptionist", "pro", "full"]),
  billing: z.enum(["monthly", "yearly"]),
});

export const leadFormSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);
export type LeadForm = z.infer<typeof leadFormSchema>;

export const leadSubmitSchema = leadFormSchema.extend({
  pain_ids: z.array(z.string().regex(/^p\d{1,2}$/)).max(34),
  utm_source: opt(150),
  utm_medium: opt(150),
  utm_campaign: opt(150),
  ref_code: z.string().trim().regex(/^[A-Za-z0-9_-]{1,64}$/).optional().or(z.literal("")),
});
export type LeadSubmit = z.infer<typeof leadSubmitSchema>;
