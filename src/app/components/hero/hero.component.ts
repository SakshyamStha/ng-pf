import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  typewriterText = '';
  showCursor = true;

  private phrases = [
    'AI Automation Workflows',
    'things for the web',
    'clean interfaces',
    'full stack apps',
    'your next project',
    'digital experiences',
  ];
  private phraseIdx = 0;
  private charIdx = 0;
  private isDeleting = false;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;
  private cursorTimer: ReturnType<typeof setInterval> | null = null;

  stats = [
    { num: '2+', label: 'Years Coding' },
    { num: '10+', label: 'Projects Built' },
    { num: '5+', label: 'Happy Clients' },
  ];

  socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sakshyam-shrestha-839a252b8/', icon: 'LI' },
    { label: 'GitHub', href: 'https://github.com/SakshyamStha', icon: 'GH' },
    { label: 'Instagram', href: 'https://www.instagram.com/_saksham_stha_59/', icon: 'IG' },
  ];

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => this.type(), 800);
    this.cursorTimer = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 500);
  }

  private type(): void {
    const current = this.phrases[this.phraseIdx];
    if (!this.isDeleting) {
      this.charIdx++;
      this.typewriterText = current.slice(0, this.charIdx);
      if (this.charIdx === current.length) {
        this.isDeleting = true;
        this.typeTimer = setTimeout(() => this.type(), 1800);
        return;
      }
    } else {
      this.charIdx--;
      this.typewriterText = current.slice(0, this.charIdx);
      if (this.charIdx === 0) {
        this.isDeleting = false;
        this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      }
    }
    const speed = this.isDeleting ? 55 : 90;
    this.typeTimer = setTimeout(() => this.type(), speed);
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
    if (this.cursorTimer) clearInterval(this.cursorTimer);
  }

  navigate(id: string): void {
    this.scrollService.scrollToSection(id);
  }
}
