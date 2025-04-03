import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDataService } from '../../services/blog-data.service';
import { Blog } from '../../models/blog.model';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-top-nav-search',
  templateUrl: './top-nav-search.component.html',
  styleUrls: ['./top-nav-search.component.scss']
})
export class TopNavSearchComponent implements OnInit {
  searchQuery: string = '';
  showResults: boolean = false;
  searchResults: Blog[] = [];
  isSearching: boolean = false;
  recentSearches: string[] = [];
  
  private searchSubject = new Subject<string>();

  constructor(
    private blogDataService: BlogDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      this.recentSearches = JSON.parse(savedSearches);
    }

    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  onSearchInput(): void {
    this.isSearching = true;
    this.searchSubject.next(this.searchQuery.trim());
  }

  performSearch(query: string): void {
    if (query) {
      this.searchResults = this.blogDataService.searchBlogs(query);
      this.showResults = true;
    } else {
      this.searchResults = [];
      this.showResults = true; // Show recent searches instead
    }
    this.isSearching = false;
  }

  onFocus(): void {
    if (this.searchQuery.trim()) {
      this.performSearch(this.searchQuery.trim());
    } else {
      this.showResults = true; // Show recent searches
    }
  }

  onBlur(): void {
    // Small delay to allow clicking on results
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  selectResult(blog: Blog): void {
    // Save search to recent searches
    this.addToRecentSearches(this.searchQuery);
    
    // Navigate to the blog page
    this.router.navigate(['/blog', blog.slug]);
    this.showResults = false;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
    // If we're on a search results page, navigate back to blogs
    if (this.router.url.includes('/search')) {
      this.router.navigate(['/blogs']);
    }
  }

  executeSearch(): void {
    if (this.searchQuery.trim()) {
      this.addToRecentSearches(this.searchQuery);
      this.router.navigate(['/search'], { 
        queryParams: { query: this.searchQuery.trim() } 
      });
      this.showResults = false;
    }
  }

  selectRecentSearch(query: string): void {
    this.searchQuery = query;
    this.performSearch(query);
  }

  removeRecentSearch(index: number, event: Event): void {
    event.stopPropagation();
    this.recentSearches.splice(index, 1);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  getCategoryName(categoryId: string): string {
    const category = this.blogDataService.getCategoryById(categoryId);
    return category ? category.name : 'Uncategorized';
  }

  private addToRecentSearches(query: string): void {
    // Don't add if it's already in recent searches
    if (!query || this.recentSearches.includes(query)) return;
    
    // Add to recent searches
    this.recentSearches.unshift(query);
    
    // Keep only the last 5 searches
    if (this.recentSearches.length > 5) {
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
}
