import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    // Set homepage SEO meta tags
    this.seoService.setHomeMetaTags();
  }
}
