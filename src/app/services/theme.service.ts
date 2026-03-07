import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'dark' | 'light'>('dark');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
      this.theme.set(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }

  toggle(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }
  }
}
