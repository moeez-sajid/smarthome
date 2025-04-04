import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { NewsletterService } from '../../services/newsletter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.scss']
})
export class NewsletterPopupComponent implements OnInit {
  newsletterForm: FormGroup;
  submitted = false;
  success = false;
  error = false;
  showPopup = false;

  constructor(
    private newsletterService: NewsletterService,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      setTimeout(() => {
        this.showPopup = true;
      }, 5000);
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.showPopup) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.closePopup();
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    if (this.showPopup) {
      this.closePopup();
    }
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      this.submitted = true;
      const email = this.newsletterForm.get('email')?.value;
      
      this.newsletterService.subscribe(email).subscribe({
        next: () => {
          this.success = true;
          this.error = false;
          this.newsletterForm.reset();
          // Hide popup after 3 seconds
          setTimeout(() => {
            this.closePopup();
          }, 3000);
        },
        error: () => {
          this.error = true;
          this.success = false;
        }
      });
    }
  }

  closePopup() {
    this.showPopup = false;
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  }
} 