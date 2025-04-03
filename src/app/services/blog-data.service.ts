import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Blog, BlogSection, ContentBlock } from '../models/blog.model';
import { Category } from '../models/category.model';

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogDataService {
  private blogsToDisplaySubject = new BehaviorSubject<Blog[]>([]);
  private paginationInfoSubject = new BehaviorSubject<PaginationInfo>({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    totalPages: 1
  });

  blogsToDisplay$ = this.blogsToDisplaySubject.asObservable();
  paginationInfo$ = this.paginationInfoSubject.asObservable();

  private allBlogs: Blog[] = [];
  private filteredBlogs: Blog[] = [];
  private categories: Category[] = [];

  constructor() {
    // Initialize with mock data for now
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize categories
    this.categories = [
      {
        id: '1',
        name: 'Smart Lighting',
        slug: 'smart-lighting',
        description: 'Articles about smart lighting solutions',
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Home Security',
        slug: 'home-security',
        description: 'Articles about home security systems',
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more mock categories as needed
    ];

    // Initialize blogs
    this.allBlogs = [
      {
        id: '1',
        title: 'The Future of Smart Lighting',
        content: 'Smart lighting content...',
        category: '1',
        author: '1',
        tags: ['lighting', 'innovation', 'smart home'],
        status: 'published',
        publishDate: new Date('2024-03-01'),
        slug: 'the-future-of-smart-lighting',
        description: 'Explore the latest innovations in smart lighting technology',
        featured: true,
        template: 'standard',
        headerImage: 'https://example.com/images/smart-lighting.jpg',
        sections: [],
        contentBlocks: [],
        recommendations: [],
        isDeleted: false,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Home Security Best Practices',
        content: 'Home security content...',
        category: '2',
        author: '1',
        tags: ['security', 'safety', 'cameras'],
        status: 'published',
        publishDate: new Date('2024-02-28'),
        slug: 'home-security-best-practices',
        description: 'Learn essential strategies and technologies to protect your home',
        featured: false,
        template: 'standard',
        headerImage: 'https://example.com/images/home-security.jpg',
        sections: [],
        contentBlocks: [],
        recommendations: [],
        isDeleted: false,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more mock blogs as needed
    ];

    this.filteredBlogs = [...this.allBlogs];
    this.updatePagination(1);
  }

  getCategories(): Category[] {
    return this.categories.filter(cat => cat.isActive);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(cat => cat.id === id && cat.isActive);
  }

  getBlogBySlug(slug: string): Blog | undefined {
    return this.allBlogs.find(blog => blog.slug === slug && !blog.isDeleted);
  }

  getRelatedBlogs(blogId: string, categoryId: string, limit: number = 3): Blog[] {
    return this.allBlogs
      .filter(blog => blog.category === categoryId && blog.id !== blogId && !blog.isDeleted)
      .slice(0, limit);
  }

  filterByCategory(categoryId: string | null) {
    if (!categoryId) {
      this.filteredBlogs = this.allBlogs.filter(blog => !blog.isDeleted);
    } else {
      this.filteredBlogs = this.allBlogs.filter(blog => blog.category === categoryId && !blog.isDeleted);
    }
    
    this.updatePagination(1);
  }

  private updatePagination(page: number) {
    const itemsPerPage = this.paginationInfoSubject.value.itemsPerPage;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    this.blogsToDisplaySubject.next(this.filteredBlogs.slice(startIndex, endIndex));
    
    this.paginationInfoSubject.next({
      currentPage: page,
      itemsPerPage,
      totalItems: this.filteredBlogs.length,
      totalPages: Math.ceil(this.filteredBlogs.length / itemsPerPage)
    });
  }

  setPage(page: number) {
    this.updatePagination(page);
  }

  setItemsPerPage(itemsPerPage: number) {
    this.paginationInfoSubject.next({
      ...this.paginationInfoSubject.value,
      itemsPerPage
    });
    this.updatePagination(1);
  }

  searchBlogs(query: string): Blog[] {
    query = query.toLowerCase().trim();
    
    if (!query) return [];

    return this.allBlogs.filter(blog => {
      if (blog.isDeleted) return false;

      // Check title and description (higher priority)
      if (blog.title.toLowerCase().includes(query) || 
          blog.description.toLowerCase().includes(query)) {
        return true;
      }
      
      // Check tags
      if (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(query))) {
        return true;
      }
      
      // Check category name
      const category = this.getCategoryById(blog.category);
      if (category && category.name.toLowerCase().includes(query)) {
        return true;
      }
      
      // Check sections content
      if (blog.sections && blog.sections.some((section: BlogSection) => 
        section.heading.toLowerCase().includes(query) || 
        section.content.toLowerCase().includes(query))) {
        return true;
      }
      
      // Check content blocks if available
      if (blog.contentBlocks && blog.contentBlocks.some((block: ContentBlock) => {
        if (block.heading && block.heading.toLowerCase().includes(query)) {
          return true;
        }
        if (block.content && block.content.toLowerCase().includes(query)) {
          return true;
        }
        return false;
      })) {
        return true;
      }
      
      return false;
    });
  }
}
