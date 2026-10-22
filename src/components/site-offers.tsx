import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouterState } from '@tanstack/react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CtaButton } from '@/components/site';
import { AGENT_PORTRAITS } from '@/lib/agent-portraits';
import { Waveform } from '@/components/call-player';
import { track } from '@/lib/analytics';
import { captureAttribution } from '@/lib/attribution';
import { offersAllowed, shouldShowOffer, shouldOpenExit } from '@/lib/offer-rules';

export function OfferLine() { return <>14-day free trial · Setup <s>$1,000</s> <strong>$0</strong> · +$250 bonus credits</>; }
export function SiteOffers() {
 const path=useRouterState({select:s=>s.location.pathname});
 const [mounted,setMounted]=useState(false);
 const [scroll,setScroll]=useState(0);
 const [dismissed,setDismissed]=useState(false);
 const [focused,setFocused]=useState(false);
 const [exitOpen,setExitOpen]=useState(false);
 const [cookiesChosen,setCookiesChosen]=useState(false);
 const previousFocus=useRef<HTMLElement|null>(null);
 useEffect(()=>{
  setMounted(true);setDismissed(sessionStorage.getItem('ctaBarDismissed')==='true');
  const cookie=()=>setCookiesChosen(!!localStorage.getItem('aisc_cookie_choice'));cookie();
  const onScroll=()=>setScroll(window.scrollY);onScroll();
  const focus=()=>setFocused(document.activeElement?.closest('form')!==null);
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('aisc-cookie-choice',cookie);document.addEventListener('focusin',focus);document.addEventListener('focusout',focus);
  return ()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('aisc-cookie-choice',cookie);document.removeEventListener('focusin',focus);document.removeEventListener('focusout',focus);};
 },[]);
 useEffect(()=>{captureAttribution(window.location.search);},[path]);
 useEffect(()=>{
  if (!offersAllowed(path)) {setExitOpen(false);return;}
  const start=Date.now(); let topExit=false;
  const attempt=()=>{
   const mobile=matchMedia('(pointer: coarse), (max-width: 767px)').matches;
   const total=document.documentElement.scrollHeight-window.innerHeight;
   const depth=total>0?window.scrollY/total:0;
   if (sessionStorage.getItem('aiscExitShown')||document.activeElement?.closest('form')||!localStorage.getItem('aisc_cookie_choice')) return;
   if (shouldOpenExit(Date.now()-start,mobile,depth,topExit)) {previousFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;sessionStorage.setItem('aiscExitShown','true');setExitOpen(true);track('exit_popup_shown');}
   topExit=false;
  };
  const leave=(e:MouseEvent)=>{if(e.clientY<=0&&!e.relatedTarget){topExit=true;attempt();}};
  const timer=window.setInterval(attempt,1000);
  document.addEventListener('mouseout',leave);window.addEventListener('scroll',attempt,{passive:true});
  return ()=>{clearInterval(timer);document.removeEventListener('mouseout',leave);window.removeEventListener('scroll',attempt);};
 },[path]);
 const show=mounted&&cookiesChosen&&shouldShowOffer(path,scroll,dismissed,focused,exitOpen);
 useEffect(()=>{
  if(!show) {document.body.style.removeProperty('--offer-space');return;}
  const bar=document.getElementById('bottom-offer-bar');if(!bar)return;
  const resize=new ResizeObserver(()=>document.body.style.setProperty('--offer-space',`${bar.offsetHeight+40}px`));resize.observe(bar);
  return ()=>{resize.disconnect();document.body.style.removeProperty('--offer-space');};
 },[show]);
 if(!mounted)return null;
 return <>
 {show&&createPortal(<aside id="bottom-offer-bar" className="bottom-offer" aria-label="Free trial offer"><div className="offer-avatar"><img src={AGENT_PORTRAITS['Amy']} alt="Amy, AI Receptionist" loading="lazy" width="48" height="48"/><span/></div><div className="offer-copy"><p><OfferLine/></p><p>Amy answers and books your practice's calls 24/7.</p></div><span onClickCapture={()=>track('cta_bar_click')}><CtaButton size="sm"/></span><Button variant="ghost" size="icon" aria-label="Close offer bar" className="offer-close" onClick={()=>{sessionStorage.setItem('ctaBarDismissed','true');setDismissed(true);}}><X size={16}/></Button></aside>,document.body)}
 <Dialog.Root open={exitOpen} onOpenChange={setExitOpen}><Dialog.Portal><Dialog.Overlay className="exit-overlay"/><Dialog.Content className="exit-modal" onCloseAutoFocus={e=>{e.preventDefault();previousFocus.current?.focus();}}><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close before you go" className="absolute right-3 top-3"><X size={18}/></Button></Dialog.Close><img src={AGENT_PORTRAITS['Amy']} alt="Amy, AI Receptionist" className="mx-auto h-24 w-24 rounded-full object-cover object-top pulse-ring" loading="lazy" width="96" height="96"/><Waveform/><Dialog.Title className="text-3xl font-extrabold">Before you go</Dialog.Title><Dialog.Description className="text-base text-muted-foreground">Try the full platform free for 14 days, and hear Amy answer your practice's questions within 3–4 minutes of setup.</Dialog.Description><p className="rounded-full bg-accent-soft px-3 py-2 text-sm">Setup <s>$1,000</s> <strong>$0</strong> · +$250 bonus credits</p><div onClickCapture={()=>track('exit_popup_click')}><CtaButton className="w-full"/></div><Dialog.Close asChild><Button variant="link" className="text-muted-foreground">No thanks, I'll keep browsing</Button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
 </>;
}
