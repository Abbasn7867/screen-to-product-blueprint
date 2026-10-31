import { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import amyScene from '@/assets/amy-medical-scene-silver.jpg';
import logo from '@/assets/aisc-logo.png.asset.json';

// The real intro video, hosted on YouTube. Captions are switched on by the player.
export const INTRO_VIDEO = {
  youtubeId: 'Bc2ZzYFr9BU',
  seconds: 60,
  watchUrl: 'https://www.youtube.com/watch?v=Bc2ZzYFr9BU',
};

const TITLE = `Meet Your AI Front Office in ${INTRO_VIDEO.seconds} Seconds`;
const TRANSCRIPT = [
  'Every patient call answered. Every visit booked.',
  'Meet Amy, your AI receptionist, and the AI Front Office team: 8 AI employees that answer, book, follow up and report for your practice, 24/7.',
  'Book a Free Trial, then get set up in minutes with the Setup Wizard.',
  'Your team stays focused on the patients in front of them.',
];

function embedUrl(autoPlay: boolean) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    cc_load_policy: '1',
    cc_lang_pref: 'en',
    hl: 'en',
  });
  if (autoPlay) {
    params.set('autoplay', '1');
    params.set('mute', '1');
  }
  return `https://www.youtube-nocookie.com/embed/${INTRO_VIDEO.youtubeId}?${params.toString()}`;
}

function Player({ autoPlay }: { autoPlay?: boolean }) {
  return (
    <iframe
      className="h-full w-full"
      src={embedUrl(!!autoPlay)}
      title={TITLE}
      loading={autoPlay ? 'eager' : 'lazy'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export function WatchIntroButton() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', k);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', k);
    };
  }, [open]);
  return (
    <>
      <Button variant="outline" size="lg" onClick={() => setOpen(true)} className="rounded-full"><Play size={18} /> Watch the Intro</Button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={TITLE} className="video-lightbox" onClick={() => setOpen(false)}>
          <Button variant="ghost" size="icon" autoFocus aria-label="Close video" className="video-close" onClick={() => setOpen(false)}><X /></Button>
          <div className="video-frame" onClick={(e) => e.stopPropagation()}><Player autoPlay /></div>
        </div>
      )}
    </>
  );
}

export function IntroVideoSection() {
  const [playing, setPlaying] = useState(false);
  const [transcript, setTranscript] = useState(false);
  return (
    <section id="intro-video" className="section-space bg-card">
      <div className="page-width">
        <div className="section-heading text-center"><p className="eyebrow">Intro Video</p><h2>{TITLE}</h2></div>
        <div className="video-card">
          {playing ? <Player autoPlay /> : (
            <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`Play: ${TITLE}`}>
              <img src={amyScene} alt="" loading="lazy" className="person-photo" style={{'--focus':'50% 30%'} as React.CSSProperties} />
              <span className="video-poster-shade" />
              <img src={logo.url} alt="" className="video-poster-logo" loading="lazy" />
              <span className="video-play"><Play size={34} /></span>
              <strong className="video-poster-title">{TITLE}</strong>
            </button>
          )}
        </div>
        <div className="mt-5 text-center">
          <Button variant="link" aria-expanded={transcript} aria-controls="intro-transcript" onClick={() => setTranscript((t) => !t)}>{transcript ? 'Hide the Transcript' : 'Read the Transcript'}</Button>
          {transcript && <div id="intro-transcript" className="mx-auto mt-3 max-w-2xl space-y-2 text-left text-muted-foreground">{TRANSCRIPT.map((l) => <p key={l}>{l}</p>)}</div>}
        </div>
      </div>
    </section>
  );
}
