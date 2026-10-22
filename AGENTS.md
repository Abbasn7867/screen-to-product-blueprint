<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep agent portrait sources in the browser-safe `src/lib/agent-portraits.ts` map so selection chips and detail panels use the same image; imported CDN pointers preserve supplied original portraits and Amy uses reference-based bundled images.
- Keep the medical problem catalog in `src/data/painPoints.ts` and derive category, agent and outcome displays from it so coverage remains consistent.
- Keep browser-safe presentation metadata and call scenarios separate from route components so SSR imports remain safe and sections share one source.
- Mount session-based site offers once in the root layout, portal the frosted bar directly to body, and keep timing/visibility rules in a tested pure module so overlays do not interfere with forms or each other.
- Trial sign-ups go through the `submitLead` server function (src/lib/leads.functions.ts): it validates with the shared schema in src/lib/lead-schema.ts, inserts into the insert-only `leads` table, then forwards to the CRM webhook from a secret, retrying once — so the public never reads leads and the webhook URL stays out of code.
