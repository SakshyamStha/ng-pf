import {
  Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: 'up' | 'left' | 'right' = 'up';
  @Input() revealDelay = 0;

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.el.nativeElement;
    el.classList.add(`reveal-${this.appReveal}`);
    if (this.revealDelay) el.style.transitionDelay = `${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          this.observer?.unobserve(el);
        }
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0 }
    );

    // Defer by one frame — ensures above-the-fold elements
    // (like the hero) are correctly detected as intersecting
    requestAnimationFrame(() => {
      this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
