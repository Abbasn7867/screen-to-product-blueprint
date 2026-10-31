import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Pause, Play, RotateCcw, Volume2, VolumeX, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AGENT_PORTRAITS } from '@/lib/agent-portraits';
import { CALL_SCENARIOS } from '@/data/callScenarios';

export function Waveform({ playing = true }: { playing?: boolean }) {
 return <div className={`waveform ${playing ? 'is-playing' : ''}`} aria-hidden="true">{Array.from({length:28},(_,i)=><span key={i} />)}</div>;
}
export function CallPlayer({ compact = false, initialScenario = 1 }: { compact?: boolean; initialScenario?: number }) {
 const [scenario, setScenario] = useState(initialScenario);
 const [playing,setPlaying] = useState(true);
 const [seconds,setSeconds] = useState(0);
 const [sound,setSound] = useState(false);
 const reduce = useReducedMotion();
 const box = useRef<HTMLDivElement>(null);
 const spoken = useRef(-1);
 const call = CALL_SCENARIOS[scenario] ?? CALL_SCENARIOS[0];
 const current = Math.floor(seconds / 5);
 useEffect(()=>{
  if (!playing || reduce) return;
  const id = window.setInterval(()=>setSeconds(s=>compact && s >= 39 ? 0 : Math.min(s+1,40)),1000);
  return ()=>window.clearInterval(id);
 },[playing,compact,reduce]);
 useEffect(()=>{
  if (!call || !sound || !playing || typeof speechSynthesis === 'undefined') return;
  if (current !== spoken.current && current < call.lines.length) {
   const line=call.lines[current]; if (!line) return;
   speechSynthesis.cancel(); const utterance=new SpeechSynthesisUtterance(line.text); utterance.rate=1.03; speechSynthesis.speak(utterance); spoken.current=current;
  }
  return ()=>speechSynthesis.cancel();
 },[current,call,sound,playing]);
 useEffect(()=>{ if (box.current) box.current.scrollTop=box.current.scrollHeight; },[seconds]);
 if (!call) return null;
 const complete = reduce || current >= call.lines.length;
 const lines = reduce ? call.lines : call.lines.slice(0,Math.min(current+1,call.lines.length));
 const restart=()=>{setSeconds(0);setPlaying(true);spoken.current=-1;};
 return <div className={`call-player ${compact ? 'compact-call' : ''}`}>
 {!compact && <div role="tablist" aria-label="Call scenarios" className="scenario-tabs">{CALL_SCENARIOS.map((c,i)=><Button variant="ghost" role="tab" aria-selected={scenario===i} aria-controls="call-transcript" key={c.title} onClick={()=>{setScenario(i);restart();}} className={scenario===i?'bg-primary text-primary-foreground hover:bg-primary-deep hover:text-primary-foreground':''}>{c.title}</Button>)}</div>}
 <div className="call-top"><img src={AGENT_PORTRAITS['Amy']} alt="Amy, AI Receptionist" className="call-avatar person-photo pulse-ring" loading={compact?undefined:'lazy'} width="64" height="64"/><div className="flex-1"><p className="font-extrabold">Amy <span className="text-sm font-medium text-muted-foreground">· Receptionist</span></p><p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><Phone size={12}/> {compact?'Live call preview':'Illustrative call · sample voice optional'}</p></div><span className="font-mono text-sm">00:{String(Math.min(seconds,40)).padStart(2,'0')}</span></div>
 <Waveform playing={playing && !complete}/>
 <div id={compact?undefined:'call-transcript'} role={compact?undefined:'tabpanel'} aria-label={call.title} ref={box} className="transcript">
 {lines.map((l,i)=><motion.div initial={reduce?false:{y:8,opacity:0}} animate={{y:0,opacity:1}} key={`${scenario}-${i}`} className={`transcript-line ${l.speaker==='Amy'?'amy-line':'caller-line'}`}><strong>{l.speaker}</strong><p>{complete||i<current?l.text:l.text.slice(0,Math.max(1,(seconds%5+1)*Math.ceil(l.text.length/5)))}</p></motion.div>)}
 </div>
 <div className="call-bottom"><span className={`outcome-chip ${complete?'':'in-progress'}`}>{complete?<><Check size={14}/>{compact?'Booked ✓':call.outcome}</>:'Amy is answering…'}</span><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label={playing?'Pause call':'Play call'} title={playing?'Pause call':'Play call'} onClick={()=>setPlaying(p=>!p)}>{playing?<Pause size={16}/>:<Play size={16}/>}</Button><Button variant="ghost" size="icon" aria-label="Replay call" title="Replay call" onClick={restart}><RotateCcw size={16}/></Button>{!compact && <Button variant="ghost" size="icon" aria-label={sound?'Mute sample voice':'Enable sample voice'} title={sound?'Mute sample voice':'Enable sample voice'} onClick={()=>setSound(s=>!s)}>{sound?<Volume2 size={16}/>:<VolumeX size={16}/>}</Button>}</div></div>
 </div>;
}
