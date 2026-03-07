import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface TimelineItem {
  type: 'work' | 'edu';
  side: 'left' | 'right';
  date: string;
  title: string;
  org: string;
  desc: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgClass, RevealDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  items: TimelineItem[] = [
    {
      type: 'work', side: 'left',
      date: '2024 — Present',
      title: 'Angular Developer',
      org: 'Employed · On-Site',
      desc: 'Building custom websites and web apps for local businesses and international clients. Specializing in e-commerce and landing pages.',
    },

    {
      type: 'edu', side: 'right',
      date: '2023 — Present',
      title: 'BSc in Computer Science',
      org: 'Tribhuvan University · Kathmandu',
      desc: 'Studying core computer science concepts including algorithms, data structures, databases, and software engineering.',
    },
    {
      type: 'work', side: 'left',
      date: '2023',
      title: 'Frontend Developer Intern',
      org: 'TechStartup · Kathmandu',
      desc: 'Developed responsive UI components, collaborated with designers, and contributed to the company\'s main product dashboard.',
    },
    {
      type: 'edu', side: 'right',
      date: '2021 — 2023',
      title: '+2 Science (NEB)',
      org: 'Secondary School · Kathmandu',
      desc: 'Completed higher secondary education with distinction. Began self-learning web development during this period.',
    },
  ];
}
