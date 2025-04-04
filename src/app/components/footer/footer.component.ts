import { Component } from '@angular/core';
import { NewsletterService } from '../../services/newsletter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  newsletterForm: FormGroup;
  submitted = false;
  success = false;
  error = false;

  constructor(
    private newsletterService: NewsletterService,
    private fb: FormBuilder
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
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
        },
        error: () => {
          this.error = true;
          this.success = false;
        }
      });
    }
  }
} 