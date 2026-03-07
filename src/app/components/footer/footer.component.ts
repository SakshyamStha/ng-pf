import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year = new Date().getFullYear();

  links = ['home','about','skills','projects','contact'];
  socials = [
    { label: 'GH', name: 'GitHub',    href: 'https://github.com/SakshyamStha' },
    { label: 'LI', name: 'LinkedIn',  href: 'https://www.linkedin.com/in/sakshyam-shrestha-839a252b8/' },
    { label: 'IG', name: 'Instagram', href: 'https://www.instagram.com/_saksham_stha_59/' },
  ];

  constructor(private scrollService: ScrollService) {}

  navigate(id: string): void {
    this.scrollService.scrollToSection(id);
  }
}
