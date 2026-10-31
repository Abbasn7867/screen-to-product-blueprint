import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { CATEGORIES, PAIN_COUNT } from '@/data/painPoints';
import { AGENT_PORTRAITS } from '@/lib/agent-portraits';
import { agentFor, AGENT_KEYS, CATEGORY_ICONS, CATEGORY_PHOTOS } from '@/lib/medical-presentation';
import { Button } from '@/components/ui/button';

export function AgentChip({ agent }: { agent: string }) {
 const a=agentFor(agent);
 return <span className={`agent-chip agent-${agent}`}><img className="person-photo" src={AGENT_PORTRAITS[a.name]} alt={`${a.name}, AI ${a.role}`} loading="lazy" width="24" height="24"/>{a.name}</span>;
}
export function PainSection() {
 const [mobile,setMobile]=useState(false);
 const [open,setOpen]=useState<string[]>(['c1']);
 const reduce=useReducedMotion();
 useEffect(()=>{const m=matchMedia('(max-width: 767px)');const change=()=>setMobile(m.matches);change();m.addEventListener('change',change);return ()=>m.removeEventListener('change',change);},[]);
 return <section id="problems" className="pain-section section-space scroll-mt-32"><div className="page-width">
 <div className="section-heading"><p className="eyebrow">Sound Familiar?</p><h2>{PAIN_COUNT} Problems.<br/><span className="text-gradient">One Front Office.</span></h2><div className="category-counts"><span><strong>{PAIN_COUNT}</strong> problems</span><span><strong>8</strong> AI employees</span><span><strong>1</strong> front office</span></div></div>
 <div className="pain-bento">{CATEGORIES.map((category,i)=>{
 const Icon=CATEGORY_ICONS[i] ?? CATEGORY_ICONS[0];
 const expanded=!mobile||open.includes(category.id);
 return <article key={category.id} className={`category-card category-${i}`}>
 <div className="category-photo"><img className="person-photo" style={{'--focus':'50% 22%'} as React.CSSProperties} src={CATEGORY_PHOTOS[i]} alt={`${category.title} at a bright medical practice`} loading="lazy" width="1024" height="640"/><div className="photo-shade"/></div>
 <div className="category-heading"><span className="category-icon">{Icon&&<Icon size={25}/>}</span><div><h3>{category.title}</h3><p>{category.outcome}</p></div><Button variant="ghost" size="icon" className="md:hidden shrink-0" aria-label={`${expanded?'Collapse':'Expand'} ${category.title}`} aria-expanded={expanded} aria-controls={`${category.id}-items`} onClick={()=>setOpen(s=>s.includes(category.id)?s.filter(id=>id!==category.id):[...s,category.id])}><ChevronDown className={expanded?'rotate-180':''}/></Button></div>
 <div id={`${category.id}-items`} className="pain-items" hidden={!expanded}>{category.items.map((item,j)=><motion.div key={item.id} data-pain-id={item.id} className="pain-item" initial={reduce?false:{y:12,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true,amount:0.1}} transition={{delay:j*.04}}><h4>{item.pain}</h4><div className="fix-line"><AgentChip agent={item.agent}/><ArrowRight className="shrink-0 text-on-dark-muted" size={14}/><p><Check size={14} className={`fix-check agent-${item.agent}`}/>{item.fix}</p></div></motion.div>)}</div>
 </article>;
 })}</div>
 <div className="outcome-flow"><div className="flow-labels"><span>Pain</span><span>Agent</span><span>Outcome</span></div>{CATEGORIES.map((c,i)=>{const Icon=CATEGORY_ICONS[i];const key=AGENT_KEYS[i]??'amy';return <div className={`flow-row agent-${key}`} key={c.id}><div className="flow-category">{Icon&&<Icon size={21}/>}<span>{c.title}</span></div><span className="flow-connector" aria-hidden="true"/><AgentChip agent={key}/><span className="flow-connector" aria-hidden="true"/><p>{c.outcome}</p></div>;})}</div>
 </div></section>;
}
export function TeamSection() {
 return <section id="team" className="section-space scroll-mt-32"><div className="page-width"><div className="section-heading"><p className="eyebrow">Meet Your AI Team</p><h2>Eight Specialists.<br/>All on Your Side.</h2><p>Your staff stays focused on patients. Your AI team keeps the front office moving.</p></div><div className="team-grid">{AGENT_KEYS.map((key)=>{const a=agentFor(key);const cats=CATEGORIES.filter(c=>c.items.some(p=>p.agent===key));const items=cats.flatMap(c=>c.items.filter(p=>p.agent===key));return <article className={`team-card agent-${key} ${key==='amy'?'team-lead':''}`} key={key}><div className="team-portrait"><img className="person-photo" style={{'--focus':'50% 15%'} as React.CSSProperties} src={AGENT_PORTRAITS[a.name]} alt={`${a.name}, AI ${a.role}`} loading="lazy" width="320" height="360"/>{key==='amy'&&<span>Team lead</span>}</div><div className="team-copy"><h3>{a.name}</h3><p className="font-bold">{a.role}</p><p className="mt-3 text-sm text-muted-foreground">{cats.map(c=>c.title).join(' · ')}</p><span className="mt-3 block text-sm font-semibold">{items.length} pain points handled</span><ul className="team-fixes">{items.slice(0,2).map(p=><li key={p.id}><Check size={14}/>{p.fix}</li>)}</ul></div></article>;})}</div></div></section>;
}
