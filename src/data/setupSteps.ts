// Real Setup Wizard steps, in order (medical wording). No time estimates.
export const SETUP_STEPS: { title: string; optional?: boolean }[] = [
  { title: 'Your Practice Details' },
  { title: 'Who Sees Patients?' },
  { title: 'When Are You Open?' },
  { title: 'Which Services Do You Offer?' },
  { title: 'Your Exam Rooms' },
  { title: 'Insurance and Payments' },
  { title: 'How Should Amy Answer?' },
  { title: 'Invite Your Team', optional: true },
  { title: 'Connect Your Scheduling Software', optional: true },
  { title: "You're All Set" },
];
