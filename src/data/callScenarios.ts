const greeting = 'Thanks for calling. All calls are recorded for quality and training purposes.';
export type CallLine = { speaker: 'Amy' | 'Caller'; text: string };
export const CALL_SCENARIOS: { title: string; outcome: string; lines: CallLine[] }[] = [
 { title: 'Same-day sick visit', outcome: 'Same-day visit booked ✓', lines: [
 {speaker:'Amy',text:greeting}, {speaker:'Caller',text:"It's 7:45 and my child has a fever. Can we come in today?"},
 {speaker:'Amy',text:"I can help book a sick visit. If this is an emergency, please call 911. Would you like our nurse line for an urgent concern?"},
 {speaker:'Caller',text:"I'd like the first appointment today, please."}, {speaker:'Amy',text:'The first same-day sick-visit slot is open this morning. Shall I book it?'},
 {speaker:'Caller',text:'Yes, thank you.'}, {speaker:'Amy',text:"You're booked. I'll send the confirmation, and I can connect you with the nurse line if you need it."}]},
 { title:'Annual physical', outcome:'Physical booked · forms sent ✓',lines:[
 {speaker:'Amy',text:greeting},{speaker:'Caller',text:"I'd like to book my annual physical."},{speaker:'Amy',text:'Of course. Would a morning or afternoon visit suit you?'},
 {speaker:'Caller',text:'An afternoon next week, please.'},{speaker:'Amy',text:'There is an annual-physical slot next Tuesday afternoon. Does that work?'},
 {speaker:'Caller',text:'That works. Do I need to fill out anything?'},{speaker:'Amy',text:"You're booked. I'll text your intake forms now so you can complete them before you arrive."}]},
 {title:'Insurance accepted?',outcome:'New-patient visit booked ✓',lines:[
 {speaker:'Amy',text:greeting},{speaker:'Caller',text:"I'm a new patient. Do you take my insurance plan?"},{speaker:'Amy',text:"Tell me the plan name and I'll check our practice's approved list."},
 {speaker:'Caller',text:'It is the plan I entered on the new-patient form.'},{speaker:'Amy',text:'That plan is on the approved list. Our staff will verify your coverage before the visit. Would you like a new-patient appointment?'},
 {speaker:'Caller',text:'Yes, the next available one, please.'},{speaker:'Amy',text:"I've booked the next new-patient slot and sent your confirmation and intake forms."}]},
 {title:'Refill request',outcome:'Request routed to clinical staff ✓',lines:[
 {speaker:'Amy',text:greeting},{speaker:'Caller',text:'I need a refill of my prescription.'},{speaker:'Amy',text:'I can log your request and send it to your clinical team. I cannot approve prescriptions.'},
 {speaker:'Caller',text:'Can you send it to my usual provider?'},{speaker:'Amy',text:"Yes. I'll record the details your practice requires and route it to the right clinical staff member."},
 {speaker:'Caller',text:'Thank you. Will someone follow up?'},{speaker:'Amy',text:'Your request is logged. The clinical team will review it and follow up using your practice\'s process.'}]},
];
