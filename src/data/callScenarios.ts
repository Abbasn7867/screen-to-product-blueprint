const greeting = 'Thanks for calling. All calls are recorded for quality and training purposes.';
export type CallLine = { speaker: 'Annie' | 'Caller'; text: string };
export const CALL_SCENARIOS: { title: string; outcome: string; lines: CallLine[] }[] = [
 { title: 'Same-day sick visit', outcome: 'Same-day visit booked ✓', lines: [
 {speaker:'Annie',text:greeting}, {speaker:'Caller',text:"It's 7:45 and my child has a fever. Can we come in today?"},
 {speaker:'Annie',text:"I can help book a sick visit. If this is an emergency, please call 911. Would you like our nurse line for an urgent concern?"},
 {speaker:'Caller',text:"I'd like the first appointment today, please."}, {speaker:'Annie',text:'The first same-day sick-visit slot is open this morning. Shall I book it?'},
 {speaker:'Caller',text:'Yes, thank you.'}, {speaker:'Annie',text:"You're booked. I'll send the confirmation, and I can connect you with the nurse line if you need it."}]},
 { title:'Annual physical', outcome:'Physical booked · forms sent ✓',lines:[
 {speaker:'Annie',text:greeting},{speaker:'Caller',text:"I'd like to book my annual physical."},{speaker:'Annie',text:'Of course. Would a morning or afternoon visit suit you?'},
 {speaker:'Caller',text:'An afternoon next week, please.'},{speaker:'Annie',text:'There is an annual-physical slot next Tuesday afternoon. Does that work?'},
 {speaker:'Caller',text:'That works. Do I need to fill out anything?'},{speaker:'Annie',text:"You're booked. I'll text your intake forms now so you can complete them before you arrive."}]},
 {title:'Insurance accepted?',outcome:'New-patient visit booked ✓',lines:[
 {speaker:'Annie',text:greeting},{speaker:'Caller',text:"I'm a new patient. Do you take my insurance plan?"},{speaker:'Annie',text:"Tell me the plan name and I'll check our practice's approved list."},
 {speaker:'Caller',text:'It is the plan I entered on the new-patient form.'},{speaker:'Annie',text:'That plan is on the approved list. Our staff will verify your coverage before the visit. Would you like a new-patient appointment?'},
 {speaker:'Caller',text:'Yes, the next available one, please.'},{speaker:'Annie',text:"I've booked the next new-patient slot and sent your confirmation and intake forms."}]},
 {title:'Refill request',outcome:'Request routed to clinical staff ✓',lines:[
 {speaker:'Annie',text:greeting},{speaker:'Caller',text:'I need a refill of my prescription.'},{speaker:'Annie',text:'I can log your request and send it to your clinical team. I cannot approve prescriptions.'},
 {speaker:'Caller',text:'Can you send it to my usual provider?'},{speaker:'Annie',text:"Yes. I'll record the details your practice requires and route it to the right clinical staff member."},
 {speaker:'Caller',text:'Thank you. Will someone follow up?'},{speaker:'Annie',text:'Your request is logged. The clinical team will review it and follow up using your practice\'s process.'}]},
];
