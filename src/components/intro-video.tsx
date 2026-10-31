import { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import amyScene from '@/assets/amy-medical-scene-silver.jpg';
import logo from '@/assets/aisc-logo.png.asset.json';

// The real intro video, hosted on YouTube. Captions are switched on by the player.
export const INTRO_VIDEO = {
  youtubeId: 'Bc2ZzYFr9BU',
  seconds: 120,
  watchUrl: 'https://www.youtube.com/watch?v=Bc2ZzYFr9BU',
};

const LENGTH = INTRO_VIDEO.seconds >= 60 ? `${Math.round(INTRO_VIDEO.seconds / 60)} Minutes` : `${INTRO_VIDEO.seconds} Seconds`;
const TITLE = `Meet Your AI Front Office in ${LENGTH}`;

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
      </div>
    </section>
  );
}
