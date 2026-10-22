import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Waveform } from '@/components/call-player';

const MAX = 250;
const OPEN = 'Thanks for calling. All calls are recorded for quality and training purposes.';
const GREETINGS = [
  { label: 'Warm and Welcoming', text: `${OPEN} This is Amy at your practice. How can I help you today?` },
  { label: 'Short and Clear', text: `${OPEN} This is Amy. Are you calling to book a visit?` },
  { label: 'New Patients First', text: `${OPEN} This is Amy. Are you a new or returning patient?` },
];
const VOICES = ['Warm', 'Bright', 'Calm'];

export function GreetingPreview() {
  const [greeting, setGreeting] = useState(GREETINGS[0]!.text);
  const [voice, setVoice] = useState(VOICES[0]!);
  const [hearing, setHearing] = useState(false);
  useEffect(() => { if (!hearing) return; const t = setTimeout(() => setHearing(false), 4000); return () => clearTimeout(t); }, [hearing]);
  const hear = () => {
    setHearing(true);
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(greeting);
      u.rate = voice === 'Calm' ? 0.92 : voice === 'Bright' ? 1.08 : 1;
      u.pitch = voice === 'Bright' ? 1.15 : voice === 'Calm' ? 0.9 : 1;
      u.onend = () => setHearing(false);
      speechSynthesis.speak(u);
    }
  };
  return (
    <div className="greeting-preview">
      <div>
        <div className="flex items-center gap-3"><h3 className="text-2xl font-extrabold">How Should Amy Answer?</h3><span className="sample-tag">Sample</span></div>
        <p className="mt-2 text-sm text-muted-foreground">Pick a ready-made greeting or write your own.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {GREETINGS.map((g) => <Button key={g.label} variant="outline" size="sm" aria-pressed={greeting === g.text} onClick={() => setGreeting(g.text)}>{g.label}</Button>)}
        </div>
        <label htmlFor="greeting-box" className="mt-5 block text-sm font-bold">Greeting</label>
        <textarea id="greeting-box" value={greeting} maxLength={MAX} rows={4} onChange={(e) => setGreeting(e.target.value)} className="mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm" />
        <p className="text-right text-xs text-muted-foreground" aria-live="polite">{greeting.length}/{MAX} characters</p>
        <p className="mt-3 text-sm font-bold">Voice</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {VOICES.map((v) => <Button key={v} variant="ghost" size="sm" aria-pressed={voice === v} onClick={() => setVoice(v)} className={voice === v ? 'bg-primary text-primary-foreground hover:bg-primary-deep hover:text-primary-foreground' : 'bg-card'}>{v}</Button>)}
          <Button size="sm" onClick={hear}><Volume2 size={16} /> Hear It</Button>
        </div>
      </div>
      <div className="caller-phone" aria-label="What Callers Hear">
        <p className="text-xs font-bold uppercase text-muted-foreground">What Callers Hear</p>
        <div className="caller-bubble"><strong>Amy · {voice}</strong><p>{greeting || '…'}</p></div>
        <Waveform playing={hearing} />
      </div>
    </div>
  );
}
