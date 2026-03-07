import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  highlights = [
    { icon: '⚡', title: 'Fast Learner',     desc: 'Always keeping up with the latest web technologies' },
    { icon: '🎯', title: 'Detail-Oriented',  desc: 'Pixel-perfect UIs with accessible, clean code' },
    { icon: '🤝', title: 'Collaborative',    desc: 'Love working in teams to ship great products' },
  ];
}
