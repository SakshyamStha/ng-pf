import { Component, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [NgStyle],
  template: `<div class="scroll-progress" [ngStyle]="{'width': progress + '%'}"></div>`,
  styles: [`
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(135deg, #ea580c, #f97316);
      z-index: 10000;
      transition: width 0.1s;
    }
  `]
})
export class ScrollProgressComponent {
  progress = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }
}
