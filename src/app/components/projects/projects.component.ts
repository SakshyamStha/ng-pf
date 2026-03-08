import { Component, signal, AfterViewInit, OnDestroy, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgClass } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  category: string;
  img: string;
  liveUrl: string;
  codeUrl: string;
}

type Filter = 'all' | 'frontend' | 'fullstack' | 'ui';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ RevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('projectsTrack') projectsTrack!: ElementRef<HTMLElement>;
  
  private slideInterval: any;
  activeFilter = signal<Filter>('all');

  filters: { label: string; value: Filter }[] = [
    { label: 'All',           value: 'all'          },
    { label: 'AI Automation', value: 'automation' as Filter },
    { label: 'Frontend',      value: 'frontend'     },
    { label: 'Full Stack',    value: 'fullstack'    },
    { label: 'UI/UX',         value: 'ui'           },
  ];

  projects: Project[] = [
    {
      num: '01', title: 'E-Commerce Platform',
      desc: 'A full-stack online store with auth, cart, payments, and admin dashboard. Built for real users in Nepal.',
      tags: ['React', 'Node.js', 'MongoDB'], category: 'fullstack',
      img: 'assets/images/project1.jpg', liveUrl: '#', codeUrl: '#',
    },
    {
      num: '02', title: 'Developer Portfolio',
      desc: 'A responsive, animated portfolio website showcasing projects and skills with smooth scroll and dark mode.',
      tags: ['HTML', 'CSS3', 'JavaScript'], category: 'frontend',
      img: 'assets/images/project2.jpg', liveUrl: '#', codeUrl: '#',
    },
    {
      num: '03', title: 'Analytics Dashboard',
      desc: 'A modern analytics UI with data visualizations, dark mode, and responsive layouts designed in Figma first.',
      tags: ['Figma', 'React', 'CSS'], category: 'ui',
      img: 'assets/images/project3.jpg', liveUrl: '#', codeUrl: '#',
    },
    {
      num: '04', title: 'Task Manager App',
      desc: 'A collaborative task manager with real-time updates, user roles, and REST API backend.',
      tags: ['Node.js', 'MongoDB', 'Express'], category: 'fullstack',
      img: 'assets/images/project4.jpg', liveUrl: '#', codeUrl: '#',
    },
    {
      num: '05', title: 'Auto Worklog Generator',
      desc: 'AI-powered workflow that automatically generates daily worklogs from GitHub and GitLab commits.',
      tags: ['Make.com', 'n8n', 'OpenAI API'], category: 'automation',
      img: 'assets/images/project1.jpg', liveUrl: '#', codeUrl: '#',
    },
    {
      num: '06', title: 'Smart Email Analyzer',
      desc: 'AI automation tool that automatically reads, analyzes, and categorizes incoming emails using LLMs.',
      tags: ['Make.com', 'Python', 'AI'], category: 'automation',
      img: 'assets/images/project3.jpg', liveUrl: '#', codeUrl: '#',
    },
  ];

  get filteredProjects(): Project[] {
    const f = this.activeFilter();
    return f === 'all' ? this.projects : this.projects.filter(p => p.category === f);
  }

  setFilter(f: Filter): void {
    this.activeFilter.set(f);
    // Reset track position if filtered
    if (this.projectsTrack) {
      this.projectsTrack.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
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
    const track = this.projectsTrack?.nativeElement;
    if (!track) return;
    const scrollAmount = 370; // Approx card width + gap
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  prevSlide() {
    const track = this.projectsTrack?.nativeElement;
    if (!track) return;
    const scrollAmount = 370;
    if (track.scrollLeft === 0) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
}
