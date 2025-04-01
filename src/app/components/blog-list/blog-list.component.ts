import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDataService, Blog, PaginationInfo } from '../../services/blog-data.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  selectedCategory: string | null = null;
  paginationInfo: PaginationInfo = {
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    totalPages: 1
  };
  itemsPerPageOptions = [3, 6, 9, 12];

  constructor(
    private blogDataService: BlogDataService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.blogDataService.blogsToDisplay$.subscribe(blogs => {
      this.blogs = blogs;
    });

    this.blogDataService.paginationInfo$.subscribe(info => {
      this.paginationInfo = info;
    });

    // Handle query parameters for category filtering
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.blogDataService.filterByCategory(this.selectedCategory);
        
        // Set category-specific SEO meta tags with non-null category
        const filteredBlogs = this.blogDataService.searchBlogs(params['category']);
        this.seoService.setCategoryMetaTags(params['category'], filteredBlogs);
      } else {
        this.selectedCategory = null;
        this.blogDataService.filterByCategory(null);
        
        // Set general blog list meta tags
        this.seoService.setBlogListMetaTags();
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  }

  onPageChange(page: number): void {
    this.blogDataService.goToPage(page);
  }

  onItemsPerPageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = parseInt(select.value, 10);
    this.blogDataService.setItemsPerPage(value);
  }

  getPageNumbers(): number[] {
    const { currentPage, totalPages } = this.paginationInfo;
    const pageNumbers: number[] = [];
    
    // Always show 5 page numbers or less if not enough pages
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  }
}
