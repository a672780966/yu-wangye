import Lenis from 'lenis';

export type ScrollProgressCallback = (progress: number, scrollY: number) => void;

class ScrollController {
  private lenis: Lenis | null = null;
  private progressListeners: Set<ScrollProgressCallback> = new Set();
  private rafId: number | null = null;
  private isReducedMotion: boolean = false;

  public init(): () => void {
    if (typeof window === 'undefined') return () => {};

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isReducedMotion) {
      const handleNativeScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
        this.notifyProgress(progress, window.scrollY);
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }

    // Controlled mechanical damping configuration
    this.lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      infinite: false,
      smoothWheel: true,
      syncTouch: false,
    });

    this.lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      this.notifyProgress(e.progress, e.scroll);
    });

    const onFrame = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(onFrame);
    };
    this.rafId = requestAnimationFrame(onFrame);

    return () => {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.lenis?.destroy();
      this.lenis = null;
    };
  }

  public subscribe(cb: ScrollProgressCallback): () => void {
    this.progressListeners.add(cb);
    return () => {
      this.progressListeners.delete(cb);
    };
  }

  private notifyProgress(progress: number, scrollY: number) {
    this.progressListeners.forEach((cb) => cb(progress, scrollY));
  }

  public scrollTo(target: string | HTMLElement | number) {
    if (typeof window === 'undefined') return;

    if (typeof target === 'string') {
      const el = document.getElementById(target.replace(/^#/, ''));
      if (el) {
        if (this.lenis && !this.isReducedMotion) {
          this.lenis.scrollTo(el, {
            offset: 0,
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          el.scrollIntoView({ behavior: 'auto' });
        }
      }
    } else if (typeof target === 'number') {
      if (this.lenis && !this.isReducedMotion) {
        this.lenis.scrollTo(target, {
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: target, behavior: 'auto' });
      }
    } else if (target instanceof HTMLElement) {
      if (this.lenis && !this.isReducedMotion) {
        this.lenis.scrollTo(target, {
          offset: 0,
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    }
  }

  public getProgress(): number {
    if (typeof window === 'undefined') return 0;
    if (this.lenis) {
      return this.lenis.progress;
    }
    const total = document.documentElement.scrollHeight - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
  }
}

export const scrollController = new ScrollController();
