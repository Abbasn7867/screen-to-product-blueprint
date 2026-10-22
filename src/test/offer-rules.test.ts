import { describe, expect, it } from 'vitest';
import { shouldShowOffer, shouldOpenExit } from '@/lib/offer-rules';
describe('trial offer rules',()=>{
 it('appears at 300 pixels, not on load',()=>{expect(shouldShowOffer('/',0,false,false,false)).toBe(false);expect(shouldShowOffer('/',299,false,false,false)).toBe(false);expect(shouldShowOffer('/',300,false,false,false)).toBe(true);});
 it('does not appear after session dismissal',()=>expect(shouldShowOffer('/',500,true,false,false)).toBe(false));
 it('does not appear on trial and thank-you pages',()=>{expect(shouldShowOffer('/free-trial',500,false,false,false)).toBe(false);expect(shouldShowOffer('/thank-you',500,false,false,false)).toBe(false);});
 it('does not overlap focused forms',()=>expect(shouldShowOffer('/',500,false,true,false)).toBe(false));
 it('does not overlap the exit modal',()=>expect(shouldShowOffer('/',500,false,false,true)).toBe(false));
 it('never opens exit popup before eight seconds',()=>{expect(shouldOpenExit(7999,false,1,true)).toBe(false);expect(shouldOpenExit(8000,false,0,true)).toBe(true);});
 it('opens mobile popup at 45 seconds',()=>{expect(shouldOpenExit(44999,true,0,false)).toBe(false);expect(shouldOpenExit(45000,true,0,false)).toBe(true);});
 it('opens mobile popup at 60 percent scroll after eight seconds',()=>{expect(shouldOpenExit(8000,true,.59,false)).toBe(false);expect(shouldOpenExit(8000,true,.6,false)).toBe(true);});
 it('requires top exit on desktop',()=>{expect(shouldOpenExit(45000,false,1,false)).toBe(false);expect(shouldOpenExit(45000,false,0,true)).toBe(true);});
});
