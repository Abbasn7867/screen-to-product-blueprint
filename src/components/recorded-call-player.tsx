import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Waveform } from '@/components/call-player';
import { AGENT_PORTRAITS } from '@/lib/agent-portraits';
import { audioTime, RECORDED_CALL } from '@/data/recorded-call';

export function RecordedCallPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState<number>(RECORDED_CALL.seconds);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = card.current;
    const media = audio.current;
    if (!element || !media) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) media.pause();
    });
    observer.observe(element);
    return () => { observer.disconnect(); media.pause(); };
  }, []);

  const fail = () => { audio.current?.pause(); setPlaying(false); setFailed(true); setOpen(true); };
  const toggle = async () => {
    const media = audio.current;
    if (!media) return;
    if (!media.paused) { media.pause(); return; }
    try { await media.play(); } catch {
      if (media.error) fail();
      // Browser autoplay restrictions are not a missing recording.
    }
  };
  const seek = (value: number) => {
    if (!audio.current) return;
    audio.current.currentTime = value;
    setElapsed(value);
  };

  return <div ref={card} className="call-player recorded-call">
    <div className="call-top">
      <img src={AGENT_PORTRAITS.Amy} alt="Amy, AI Receptionist" className="call-avatar person-photo pulse-ring shrink-0" loading="lazy" width="64" height="64"/>
      <div className="min-w-0"><p className="font-extrabold">Amy <span className="text-sm font-medium text-muted-foreground">· Receptionist</span></p><p className="mt-1 text-xs text-muted-foreground">Same-day sick visit · 2:06</p></div>
    </div>
    <audio ref={audio} src={RECORDED_CALL.src} preload="none" muted={muted}
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onWaiting={() => setPlaying(false)}
      onEnded={() => setPlaying(false)} onError={fail}
      onTimeUpdate={e => setElapsed(e.currentTarget.currentTime)}
      onLoadedMetadata={e => { const seconds = e.currentTarget.duration; if (Number.isFinite(seconds) && seconds > 0) setDuration(seconds); }}/>
    {!failed && <div className="px-4 pb-5 sm:px-6">
      <div className="flex items-center gap-4">
        <Button size="icon" className="h-16 w-16 shrink-0 rounded-full" aria-label={playing ? 'Pause recorded call' : 'Play recorded call'} title={playing ? 'Pause recorded call' : 'Play recorded call'} onClick={toggle}>{playing ? <Pause size={26}/> : <Play size={26}/>}</Button>
        <div className="min-w-0 flex-1"><Waveform playing={playing}/></div>
      </div>
      <Slider className="mt-5 min-h-8" aria-label="Recorded call progress" min={0} max={duration} step={0.1} value={[elapsed]} onValueChange={v => seek(v[0] ?? 0)}/>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-mono tabular-nums text-muted-foreground" aria-label="Playback time">{audioTime(elapsed)} / {audioTime(duration)}</span>
        <div className="flex gap-1"><Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Restart recorded call" title="Restart recorded call" onClick={() => seek(0)}><RotateCcw size={18}/></Button><Button variant="ghost" size="icon" className="h-11 w-11" aria-label={muted ? 'Unmute recorded call' : 'Mute recorded call'} title={muted ? 'Unmute recorded call' : 'Mute recorded call'} onClick={() => setMuted(m => !m)}>{muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}</Button></div>
      </div>
    </div>}
    <div className="border-t border-border px-4 py-3 sm:px-6"><Button variant="ghost" aria-expanded={open} aria-controls="recorded-call-transcript" onClick={() => setOpen(o => !o)} className="gap-2">Read the transcript <ChevronDown size={16} className={open ? 'rotate-180' : ''}/></Button></div>
    {open && <div id="recorded-call-transcript" className="transcript recorded-transcript">{RECORDED_CALL.lines.map(([speaker, text], i) => <div key={i} className={`transcript-line ${speaker === 'Amy' ? 'amy-line' : 'caller-line'}`}><strong>{speaker}</strong><p>{text}</p></div>)}</div>}
  </div>;
}