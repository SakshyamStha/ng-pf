import {
  Component, AfterViewInit, QueryList,
  ViewChildren, ElementRef, PLATFORM_ID, Inject, ViewChild, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Skill { name: string; level: number; }
interface SkillCategory { title: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('skillFill') skillFills!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('skillsTrack') skillsTrack!: ElementRef<HTMLElement>;

  private slideInterval: any;

  categories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'HTML5', level: 90 },
        { name: 'CSS3 / SCSS', level: 85 },
        { name: 'JavaScript ES6+', level: 80 },
        { name: 'React.js', level: 70 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 72 },
        { name: 'Python', level: 65 },
        { name: 'MongoDB', level: 68 },
        { name: 'PostgreSQL', level: 60 },
      ],
    },
    {
      title: 'Design & Tools',
      skills: [
        { name: 'Figma', level: 78 },
        { name: 'Git / GitHub', level: 82 },
        { name: 'Docker', level: 55 },
        { name: 'Linux / CLI', level: 70 },
      ],
    },
    {
      title: 'AI & Automation',
      skills: [
        { name: 'Make.com', level: 85 },
        { name: 'n8n', level: 80 },
        // { name: 'OpenAI API', level: 75 },
        // { name: 'Python Automation', level: 70 },
      ],
    },
  ];

  badges = [
    'Angular', 'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Python',
    'MongoDB', 'PostgreSQL', 'Figma', 'Git', 'Docker', 'REST APIs',
    'Make.com', 'n8n', 'AI Automation', 'OpenAI'
  ];

  skillWidths: number[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const w = el.getAttribute('data-width');
            if (w) {
              setTimeout(() => { el.style.width = w + '%'; }, 200);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.skillFills.forEach(ref => observer.observe(ref.nativeElement));

    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.stopAutoSlide();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    const track = this.skillsTrack?.nativeElement;
    if (!track) return;
    const scrollAmount = 332; // Approx card width + gap
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  prevSlide() {
    const track = this.skillsTrack?.nativeElement;
    if (!track) return;
    const scrollAmount = 332;
    if (track.scrollLeft === 0) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
}
