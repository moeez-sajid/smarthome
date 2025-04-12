import { Component, OnInit, Input } from '@angular/core';
import { BlogDataService } from '../../services/blog-data.service';
import { Category } from '../../models/category.model';
import { Blog, ContentBlock } from '../../models/blog.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() blog: Blog | null = null;
  categories: Category[] = [];
  isExpanded = false;
  selectedCategory: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  tableOfContents: { id: string; text: string }[] = [];
  private dateChangeTimeout: any;

  constructor(private blogDataService: BlogDataService) {}

  async ngOnInit() {
    this.categories = await this.blogDataService.getCategoriesFromServer();
    if (this.blog) {
      this.generateTableOfContents();
    }
  }

  private generateTableOfContents() {
    if (!this.blog?.contentBlocks) return;
    
    this.tableOfContents = this.blog.contentBlocks
      .filter(block => block.type === 'heading' && block.makeTableOfContents)
      .map((block, index) => {
        const heading = block.content as { text: string; link?: string };
        return {
          id: `heading-${index}`,
          text: heading.text
        };
      });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  selectCategory(categoryId: string | null) {
    this.selectedCategory = categoryId;
    this.blogDataService.filterByCategory(categoryId);
  }

  onDateFilterChange() {
    // Clear any existing timeout
    if (this.dateChangeTimeout) {
      clearTimeout(this.dateChangeTimeout);
    }

    // Set a new timeout to debounce the changes
    this.dateChangeTimeout = setTimeout(() => {
      // Format dates for API
      const startDate = this.startDate ? this.formatDateForAPI(this.startDate) : null;
      const endDate = this.endDate ? this.formatDateForAPI(this.endDate) : null;

      // Validate dates
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        // Swap dates if start date is after end date
        [this.startDate, this.endDate] = [this.endDate, this.startDate];
        this.onDateFilterChange();
        return;
      }

      // Convert to Date objects for the service
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Apply date filter
      this.blogDataService.filterByDateRange(start, end);
    }, 300); // Wait 300ms before applying the filter
  }

  private formatDateForAPI(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
}
