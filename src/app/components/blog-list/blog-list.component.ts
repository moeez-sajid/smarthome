import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDataService, PaginationInfo } from '../../services/blog-data.service';
import { SeoService } from '../../services/seo.service';
import { Blog } from '../../models/blog.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  categories: Category[] = [];
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

  async ngOnInit(): Promise<void> {
    this.categories = this.blogDataService.getCategories();
    
    this.blogDataService.blogsToDisplay$.subscribe(blogs => {
      this.blogs = blogs;
    });

    this.blogDataService.paginationInfo$.subscribe(info => {
      this.paginationInfo = info;
    });

    // Handle query parameters for category filtering
    this.route.queryParams.subscribe(async params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        await this.blogDataService.filterByCategory(this.selectedCategory);
        
        // Set category-specific SEO meta tags with non-null category
        const category = this.blogDataService.getCategoryById(this.selectedCategory || '');
        if (category) {
          const filteredBlogs = await this.blogDataService.searchBlogs(category.name);
          this.seoService.setCategoryMetaTags(category.name, filteredBlogs);
        }
      } else {
        this.selectedCategory = null;
        await this.blogDataService.filterByCategory(null);
        
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
    this.blogDataService.setPage(page);
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.blogDataService.setItemsPerPage(itemsPerPage);
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

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Uncategorized';
  }
}
