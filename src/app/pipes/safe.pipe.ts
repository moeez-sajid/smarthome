import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string | undefined): SafeResourceUrl | undefined {
    if (!url) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 