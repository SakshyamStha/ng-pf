import { Component, OnInit, OnDestroy, HostListener, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    BackToTopComponent,
    ScrollProgressComponent,
  ],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  private cursorEl: HTMLElement | null = null;
  private followerEl: HTMLElement | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private followerX = 0;
  private followerY = 0;
  private rafId: number | null = null;
  private unlistenMouseMove: (() => void) | null = null;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(hover: none)').matches) return;

    this.cursorEl = document.getElementById('app-cursor');
    this.followerEl = document.getElementById('app-cursor-follower');

    this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (this.cursorEl) {
        this.cursorEl.style.left = this.mouseX + 'px';
        this.cursorEl.style.top = this.mouseY + 'px';
      }
    });

    this.animateFollower();
  }

  private animateFollower(): void {
    this.followerX += (this.mouseX - this.followerX) * 0.12;
    this.followerY += (this.mouseY - this.followerY) * 0.12;
    if (this.followerEl) {
      this.followerEl.style.left = this.followerX + 'px';
      this.followerEl.style.top = this.followerY + 'px';
    }
    this.rafId = requestAnimationFrame(() => this.animateFollower());
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.unlistenMouseMove) this.unlistenMouseMove();
  }
}
