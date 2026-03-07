import { Component, HostListener, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [],
  template: `
    <button
      class="back-to-top"
      [class.visible]="visible()"
      (click)="scrollTop()"
      aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  `,
  styles: [`
    .back-to-top {
      position: fixed; bottom: 32px; right: 32px;
      width: 48px; height: 48px; border-radius: 50%;
      background: var(--accent); color: #fff; border: none;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(234,88,12,.35);
      z-index: 100; opacity: 0; transform: translateY(16px);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
      cursor: pointer;
    }
    .back-to-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
    .back-to-top:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 8px 32px rgba(234,88,12,.35); }
    @media (max-width: 640px) { .back-to-top { bottom: 20px; right: 20px; width: 42px; height: 42px; } }
  `],
})
export class BackToTopComponent {
  visible = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.visible.set(window.scrollY > 400);
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
