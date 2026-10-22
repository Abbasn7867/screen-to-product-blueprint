// Browser-only helpers for referral + UTM attribution. Never render these values.
export const REF_COOKIE = "aisc_ref";
export const REF_DAYS = 45;
const UTM_KEY = "aisc_utm";
const REF_RE = /^[A-Za-z0-9_-]{1,64}$/;

export function captureAttribution(search: string) {
  const params = new URLSearchParams(search);
  const ref = params.get("ref");
  if (ref && REF_RE.test(ref)) {
    document.cookie = `${REF_COOKIE}=${encodeURIComponent(ref)}; Max-Age=${REF_DAYS * 86400}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }
  const utm = ["utm_source", "utm_medium", "utm_campaign"].reduce<Record<string, string>>((a, k) => {
    const v = params.get(k);
    if (v) a[k] = v.slice(0, 150);
    return a;
  }, {});
  if (Object.keys(utm).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
}

export function readAttribution() {
  const m = document.cookie.match(new RegExp(`(?:^|; )${REF_COOKIE}=([^;]*)`));
  const ref = m?.[1] ? decodeURIComponent(m[1]) : "";
  let utm: Record<string, string> = {};
  try { utm = JSON.parse(sessionStorage.getItem(UTM_KEY) || "{}"); } catch { utm = {}; }
  return {
    ref_code: REF_RE.test(ref) ? ref : "",
    utm_source: utm["utm_source"] ?? "",
    utm_medium: utm["utm_medium"] ?? "",
    utm_campaign: utm["utm_campaign"] ?? "",
  };
}
