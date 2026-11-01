import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordedCallPlayer } from '@/components/recorded-call-player';

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function observerMock() {
  let notify: IntersectionObserverCallback | undefined;
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { notify = callback; }
    observe() {}
    disconnect() {}
  });
  return (visible: boolean) => notify?.([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver);
}

describe('recorded call behavior', () => {
  it('pauses playback when the card leaves view', () => {
    const notify = observerMock();
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    render(<RecordedCallPlayer/>);
    notify(true);
    expect(pause).not.toHaveBeenCalled();
    notify(false);
    expect(pause).toHaveBeenCalledTimes(1);
  });

  it('opens the initially closed transcript and hides playback on audio failure', () => {
    observerMock();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const { container, getByRole, queryByRole } = render(<RecordedCallPlayer/>);
    expect(getByRole('button', { name: 'Read the transcript' })).toHaveAttribute('aria-expanded', 'false');
    const audio = container.querySelector('audio');
    if (!audio) throw new Error('Recording not mounted');
    fireEvent.error(audio);
    expect(getByRole('button', { name: 'Read the transcript' })).toHaveAttribute('aria-expanded', 'true');
    expect(queryByRole('button', { name: 'Play recorded call' })).toBeNull();
  });
});