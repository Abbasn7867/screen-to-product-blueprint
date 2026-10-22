// Sends analytics events only after the visitor accepted cookies.
declare global { interface Window { dataLayer?: unknown[] } }

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("aisc_cookie_choice") !== "accepted") return;
  (window.dataLayer ??= []).push({ event, ...params });
}
