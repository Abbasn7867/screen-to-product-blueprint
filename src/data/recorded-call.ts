export const RECORDED_CALL = {
  src: '/audio/medical-sick-visit-call.mp3',
  seconds: 126,
  lines: [
    ['Annie', 'Thank you for calling Cedar Ridge Family Medicine. This is Amy. How can I help you today?'],
    ['Caller', "Hey there. So, I've had this cough for about a week and I'd like to get it checked. First off, can I get a same-day appointment?"],
    ['Annie', 'Yes. We hold time for same-day sick visits. We have an opening today at 3:15 PM.'],
    ['Caller', "Okay, good. That's a relief. Quick one, should I be worried about the cough?"],
    ['Annie', 'I cannot give medical advice. If you have trouble breathing or chest pain, please call 911. Otherwise, the provider can see you today.'],
    ['Caller', 'Hmm, okay, understood. Now, do you take Blue Cross?'],
    ['Annie', 'Yes. We accept UnitedHealthcare, Blue Cross Blue Shield, Aetna, Cigna and Medicare. Your copay depends on your plan.'],
    ['Caller', 'Great, good to know. And how much is a visit without insurance?'],
    ['Annie', 'A sick visit for self-pay patients is $135.'],
    ['Caller', 'Alright, got it. And do you do flu and COVID tests there?'],
    ['Annie', 'Yes. The provider can test for flu, COVID and strep during your visit.'],
    ['Caller', 'Perfect. Another thing, could I do it as a video visit instead?'],
    ['Annie', 'Yes. If you prefer, we have a telehealth opening today at 1:40 PM.'],
    ['Caller', "Oh nice, that's good to hear. Last one, let's do the in-person visit today. Can you book that?"],
    ['Annie', 'Yes. I can book you today at 3:15 PM. Would you like me to go ahead?'],
    ['Caller', "Yeah, let's do it. My name is Greg Holloway, and my number is (919) 555-0193."],
    ['Annie', "Thank you, Greg. You're booked for a same-day sick visit today at 3:15 PM. You'll get a text confirmation at (919) 555-0193. Is there anything else I can help you with?"],
    ['Caller', 'Awesome, thanks for your help. Have a great day!'],
    ['Annie', "You're welcome. Thank you for calling Cedar Ridge Family Medicine. Goodbye."],
  ],
} as const;

export function audioTime(seconds: number) {
  const whole = Math.floor(Math.max(0, Number.isFinite(seconds) ? seconds : 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}