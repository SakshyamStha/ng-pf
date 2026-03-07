import {
  Component, OnInit, OnDestroy, HostListener,
  PLATFORM_ID, Inject, signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgClass } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { ThemeService } from '../../services/theme.service';

interface NavLink { label: string; id: string; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);
  activeSection = signal('home');

  navLinks: NavLink[] = [
    { label: 'Home',       id: 'home'       },
    { label: 'About',      id: 'about'      },
    { label: 'Skills',     id: 'skills'     },
    { label: 'Projects',   id: 'projects'   },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact',    id: 'contact'    },
  ];

  constructor(
    public themeService: ThemeService,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrolled.set(window.scrollY > 20);
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = this.navLinks.map(l => document.getElementById(l.id));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i];
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection.set(this.navLinks[i].id);
        return;
      }
    }
    this.activeSection.set('home');
  }

  navigateTo(id: string): void {
    this.scrollService.scrollToSection(id);
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
