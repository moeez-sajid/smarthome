import { Component, OnInit } from '@angular/core';
import { BlogDataService } from '../../services/blog-data.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  categories: Category[] = [];
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

  selectCategory(categoryId: string | null) {
    this.selectedCategory = categoryId;
    this.blogDataService.filterByCategory(categoryId);
  }

  onDateFilterChange() {
    if (this.startDate && this.endDate) {
      // Implement date filtering logic here
      console.log('Date filter changed:', this.startDate, this.endDate);
    }
  }
}
