import { Component, OnInit } from '@angular/core';
import { BlogDataService } from '../../services/blog-data.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  categories: string[] = [];
  isExpanded = false;
  selectedCategory: string | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private blogDataService: BlogDataService) {}

  ngOnInit() {
    this.categories = this.blogDataService.getCategories();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    this.blogDataService.filterByCategory(category);
  }

  onDateFilterChange() {
    if (this.startDate && this.endDate) {
      this.blogDataService.filterByDate(this.startDate, this.endDate);
    }
  }
}
