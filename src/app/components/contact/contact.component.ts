import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  formData = { name: '', email: '', subject: '', message: '' };
  sending = signal(false);
  sent = signal(false);

  cards = [
    { icon: 'email',    title: 'Email',    value: 'saksham6785@gmail.com', href: 'mailto:saksham6785@gmail.com' },
    { icon: 'location', title: 'Location', value: 'Kathmandu, Nepal 🇳🇵',  href: null },
    { icon: 'phone',    title: 'Phone',    value: '+977 97-6722-4731',     href: 'tel:+9779767224731' },
  ];

  socials = [
    { label: 'GitHub',    href: 'https://github.com/SakshyamStha' },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/sakshyam-shrestha-839a252b8/' },
    { label: 'Instagram', href: 'https://www.instagram.com/_saksham_stha_59/' },
  ];

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    // Replace with real API call (FormSpree / EmailJS)
    setTimeout(() => {
      this.sending.set(false);
      this.sent.set(true);
      form.resetForm();
      setTimeout(() => this.sent.set(false), 5000);
    }, 1200);
  }
}
