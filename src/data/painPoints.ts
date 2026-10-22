export const AGENTS = {
  amy: { name: "Amy", role: "Receptionist", color: "#2B6E63" },
  leena: { name: "Leena", role: "Schedule Optimizer", color: "#3E7CB8" },
  morgan: { name: "Morgan", role: "Patient Intake", color: "#E8734A" },
  kim: { name: "Kim", role: "Care Follow-through", color: "#5FA88A" },
  stephanie: { name: "Stephanie", role: "Follow-up", color: "#C98A3E" },
  elise: { name: "Elise", role: "Patient Experience", color: "#C2678D" },
  joseph: { name: "Joseph", role: "Records & Referrals", color: "#5B7B8C" },
  trisha: { name: "Trisha", role: "Practice Manager", color: "#6B5B95" },
};
export const CATEGORIES = [
  { id: "c1", title: "Calls & Scheduling", outcome: "Every patient call answered, from Monday-morning rush to after hours", items: [
    { id: "p1", pain: "Monday-morning and flu-season call spikes send patients to voicemail and hold queues", agent: "amy", fix: "Answers every call live, even at peak volume, and books straight into your scheduling system" },
    { id: "p2", pain: "Patients who wake up sick can't get through for a same-day appointment", agent: "amy", fix: "Offers the next same-day or next-day slot by your rules, and routes anything urgent to your clinical team" },
    { id: "p3", pain: "After-hours callers can't book, so routine visits wait until morning or go elsewhere", agent: "amy", fix: "Books routine visits 24/7, including evenings, weekends and holidays" },
    { id: "p4", pain: "Staff answer the same questions all day: hours, location, insurance accepted, telehealth, new-patient availability", agent: "amy", fix: "Answers common questions from your approved knowledge base and offers the next open slot" },
    { id: "p5", pain: "Callers describing urgent symptoms need immediate direction, not a booking script", agent: "amy", fix: "Follows your urgent-call protocol: directs emergencies to 911 and routes urgent concerns to staff or your nurse line; never gives medical advice" },
    { id: "p6", pain: "Callers who want a person mid-call have no clean handoff, so they hang up", agent: "amy", fix: "Recognizes a transfer request and routes to the right team member with the reason logged" },
    { id: "p7", pain: "Reminders go out late or not at all, so no-shows waste provider time", agent: "amy", fix: "Sends multi-touch reminders with one-tap confirm or reschedule" },
  ]},
  { id: "c2", title: "Provider Schedule Optimization", outcome: "Every provider's template full with the right visit types", items: [
    { id: "p8", pain: "Visits booked into the wrong slot type or length (new patient, annual physical, follow-up, procedure)", agent: "leena", fix: "Matches each visit type to the right provider, slot length and room" },
    { id: "p9", pain: "Last-minute cancellations leave provider time empty", agent: "leena", fix: "Fills openings automatically from a waitlist of patients who want an earlier visit" },
    { id: "p10", pain: "Telehealth and in-person visits collide on the same calendar", agent: "leena", fix: "Keeps telehealth and in-person slots separate and books each correctly" },
    { id: "p11", pain: "Multi-provider and multi-location schedules double-book or leave gaps", agent: "leena", fix: "Balances bookings across providers and locations without conflicts" },
  ]},
  { id: "c3", title: "Patient Intake & Insurance", outcome: "Patients arrive registered, verified and ready", items: [
    { id: "p12", pain: "New-patient forms and medical history filled out in the lobby, delaying visits", agent: "morgan", fix: "Sends digital intake forms before the visit so patients arrive ready" },
    { id: "p13", pain: "Insurance cards and demographics not collected or out of date until check-in", agent: "morgan", fix: "Collects insurance and demographic updates ahead of every visit" },
    { id: "p14", pain: "Coverage not verified before the visit, causing denials and surprise bills", agent: "morgan", fix: "Runs eligibility checks before the appointment and flags problems to staff" },
    { id: "p15", pain: "Specialist visits arrive without the required referral or authorization", agent: "morgan", fix: "Checks for required referrals and authorizations before the visit and alerts staff" },
  ]},
  { id: "c4", title: "Care Follow-through", outcome: "Ordered care actually gets scheduled", items: [
    { id: "p16", pain: "Ordered labs, imaging and tests never get scheduled after the visit", agent: "kim", fix: "Follows up until the ordered test is booked or declined" },
    { id: "p17", pain: "Specialist referrals are given but never booked by the patient", agent: "kim", fix: "Reminds patients to book referred visits and logs the outcome" },
    { id: "p18", pain: "Chronic-care follow-ups (diabetes, hypertension, etc.) slip between visits", agent: "kim", fix: "Schedules chronic-care follow-ups on the cadence your providers set" },
    { id: "p19", pain: "After-visit instructions are given verbally and forgotten", agent: "kim", fix: "Sends written after-visit instructions your providers approve by text or email" },
  ]},
  { id: "c5", title: "Recalls, Wellness & Reactivation", outcome: "Keep every patient current on their care", items: [
    { id: "p20", pain: "Annual physicals and wellness visits aren't scheduled until the patient remembers", agent: "stephanie", fix: "Sends due-date reminders for annual physicals and wellness visits" },
    { id: "p21", pain: "Preventive screenings recommended by providers go unbooked", agent: "stephanie", fix: "Sends screening-due reminders on the schedule your practice sets" },
    { id: "p22", pain: "Unconfirmed appointments aren't worked before the day", agent: "stephanie", fix: "Re-contacts unconfirmed patients before the appointment date" },
    { id: "p23", pain: "Patients who haven't visited in 12+ months are never re-engaged", agent: "stephanie", fix: "Runs reactivation outreach to lapsed patients" },
  ]},
  { id: "c6", title: "Patient Experience & Reviews", outcome: "More reviews from happy patients, fast recovery from unhappy ones", items: [
    { id: "p24", pain: "No routine review requests, so only unhappy patients post", agent: "elise", fix: "Requests a review from every patient after the visit" },
    { id: "p25", pain: "Unhappy patients post publicly before the practice can respond", agent: "elise", fix: "Routes negative feedback to private follow-up and alerts the manager" },
    { id: "p26", pain: "Reviews on Google, Healthgrades, Zocdoc and Yelp go unmonitored", agent: "elise", fix: "Monitors major platforms from one dashboard" },
    { id: "p27", pain: "Review replies risk exposing patient information", agent: "elise", fix: "Drafts HIPAA-safe response templates with staff approval" },
  ]},
  { id: "c7", title: "Faxes, Records & Referrals", outcome: "Paperwork routed to the right person, not lost in a tray", items: [
    { id: "p28", pain: "Lab results, referrals and records arrive by fax and sit in a tray", agent: "joseph", fix: "Reads incoming faxes, matches them to the right patient and routes them to the right person" },
    { id: "p29", pain: "Records requests from other providers eat front-desk time", agent: "joseph", fix: "Handles routine records requests and logs what was sent" },
    { id: "p30", pain: "Prescription refill requests clog the front desk", agent: "joseph", fix: "Routes refill requests to the right clinical staff member" },
    { id: "p31", pain: "Patients call repeatedly asking whether a referral, refill or result came through", agent: "joseph", fix: "Gives patients status updates without repeat calls" },
  ]},
  { id: "c8", title: "Practice Intelligence & Reporting", outcome: "See the whole front office at a glance", items: [
    { id: "p32", pain: "Owners and managers can't see calls answered, visits booked and no-shows in one place", agent: "trisha", fix: "Real-time view of calls, bookings, show rates and follow-ups" },
    { id: "p33", pain: "Stalled follow-ups and missed calls aren't handed off to your team", agent: "trisha", fix: "Flags idle opportunities and missed calls for action" },
    { id: "p34", pain: "The front office runs on a few people's memory", agent: "trisha", fix: "Codifies front-office workflows so nothing depends on one person" },
  ]},
];
