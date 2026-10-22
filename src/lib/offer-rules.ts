export const OFFER_SCROLL_PX = 300;
export const EXIT_MIN_MS = 8000;
export const MOBILE_EXIT_MS = 45000;
export const MOBILE_EXIT_DEPTH = 0.6;
export function offersAllowed(path: string) { return path !== '/free-trial' && path !== '/thank-you'; }
export function shouldShowOffer(path: string, scroll: number, dismissed: boolean, formFocused: boolean, exitOpen: boolean) {
  return offersAllowed(path) && scroll >= OFFER_SCROLL_PX && !dismissed && !formFocused && !exitOpen;
}
export function shouldOpenExit(elapsed: number, mobile: boolean, depth: number, topExit: boolean) {
  return elapsed >= EXIT_MIN_MS && (mobile ? elapsed >= MOBILE_EXIT_MS || depth >= MOBILE_EXIT_DEPTH : topExit);
}
