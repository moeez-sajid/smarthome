import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BlogDataService } from '../../services/blog-data.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Blog[] = [];
  isLoading: boolean = true;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  
  // Make Math available to template
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogDataService: BlogDataService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.currentPage = parseInt(params['page']) || 1;
      
      if (this.searchQuery) {
        this.performSearch();
        this.updateMetadata();
      } else {
        this.router.navigate(['/blogs']);
      }
    });
  }

  async performSearch() {
    try {
      this.isLoading = true;
      
      // Get all results
      this.searchResults = await this.blogDataService.searchBlogs(this.searchQuery);
      this.totalItems = this.searchResults.length;
      
      // Get paginated results
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.searchResults = this.searchResults.slice(startIndex, endIndex);
      
      this.isLoading = false;
    } catch (error) {
      console.error('Error in performSearch:', error);
      this.isLoading = false;
    }
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery, page: page },
      queryParamsHandling: 'merge'
    });
  }

  clearSearch(): void {
    this.router.navigate(['/blogs']);
  }

  getCategoryName(categoryId: string): string {
    const category = this.blogDataService.getCategoryById(categoryId);
    return category ? category.name : 'Uncategorized';
  }

  private updateMetadata(): void {
    this.titleService.setTitle(`Search results for "${this.searchQuery}" | Smart Homes Blog`);
    this.metaService.updateTag({ 
      name: 'description', 
      content: `Search results for ${this.searchQuery} on Smart Homes Blog. Find articles, guides, and product reviews.` 
    });
    // Add noindex for search results pages
    this.metaService.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}
