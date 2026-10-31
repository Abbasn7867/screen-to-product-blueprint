import { AGENTS } from '@/data/painPoints';
import calls from '@/assets/category-calls.jpg';
import schedule from '@/assets/category-schedule.jpg';
import intake from '@/assets/category-intake.jpg';
import consent from '@/assets/category-intake.jpg';
import insurance from '@/assets/category-records.jpg';
import care from '@/assets/category-care.jpg';
import wellness from '@/assets/category-wellness.jpg';
import reviews from '@/assets/category-reviews.jpg';
import records from '@/assets/category-records.jpg';
import reporting from '@/assets/category-reporting.jpg';
import { PhoneCall, CalendarCheck, ClipboardCheck, FileSignature, ShieldCheck, HeartPulse, CalendarClock, Star, Files, ChartNoAxesCombined } from 'lucide-react';
export const CATEGORY_PHOTOS = [calls, schedule, intake, consent, insurance, care, wellness, reviews, records, reporting];
export const CATEGORY_ICONS = [PhoneCall, CalendarCheck, ClipboardCheck, FileSignature, ShieldCheck, HeartPulse, CalendarClock, Star, Files, ChartNoAxesCombined];
export type AgentKey = keyof typeof AGENTS;
export function agentFor(key: string) { return AGENTS[key as AgentKey] ?? AGENTS.amy; }
export const AGENT_KEYS = Object.keys(AGENTS) as AgentKey[];
