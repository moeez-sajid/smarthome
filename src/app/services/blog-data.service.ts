import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Blog, BlogSection, ContentBlock } from '../models/blog.model';
import { Category } from '../models/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  private categories: Category[] = [];

  constructor(private httpClient: HttpClient) {
    this.getCategoriesFromServer();
    this.loadBlogsFromServer();
  }

  async getCategoriesFromServer(): Promise<Category[]> {
    try {
      const res = await firstValueFrom(
        this.httpClient.get<Category[]>('http://localhost:3000/api/categories')
      );
      this.categories = res;
    } catch (error) {
      console.error('Failed to load categories', error);
      this.categories = [];
    }
    return this.categories;
  }

  getCategories(): Category[] {
    return this.categories.filter(cat => cat.isActive);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(cat => cat._id === id && cat.isActive);
  }

  async loadBlogsFromServer(categoryId: string | null = null, page: number = 1): Promise<void> {
    try {
      let params = new HttpParams()
        .set('status', 'published')
        .set('page', page.toString())
        .set('limit', this.paginationInfoSubject.value.itemsPerPage.toString());

      if (categoryId) {
        params = params.set('category', categoryId);
      }

      const res = await firstValueFrom(
        this.httpClient.get<any>('http://localhost:3000/api/blogs', { params })
      );

      this.blogsToDisplaySubject.next(res.blogs);
      this.paginationInfoSubject.next({
        currentPage: res.pagination.page,
        itemsPerPage: res.pagination.limit,
        totalItems: res.pagination.total,
        totalPages: res.pagination.pages
      });
    } catch (error) {
      console.error('Failed to load blogs', error);
      this.blogsToDisplaySubject.next([]);
    }
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    try {
      const blog = await firstValueFrom(
        this.httpClient.get<Blog>(`http://localhost:3000/api/blogs/${slug}`)
      );
      return blog;
    } catch (error) {
      console.error(`Blog not found for slug: ${slug}`, error);
      return undefined;
    }
  }

  async getRelatedBlogs(blogId: string, categoryId: string, limit: number = 3): Promise<Blog[]> {
    try {
      const params = new HttpParams()
        .set('category', categoryId)
        .set('status', 'published')
        .set('limit', '10');

      const res = await firstValueFrom(
        this.httpClient.get<any>('http://localhost:3000/api/blogs', { params })
      );

      return res.blogs.filter((b: Blog) => b.id !== blogId).slice(0, limit);
    } catch (error) {
      console.error('Error fetching related blogs:', error);
      return [];
    }
  }

  async filterByCategory(categoryId: string | null): Promise<void> {
    await this.loadBlogsFromServer(categoryId, 1);
  }

  async setPage(page: number): Promise<void> {
    await this.loadBlogsFromServer(null, page);
  }

  async setItemsPerPage(itemsPerPage: number): Promise<void> {
    this.paginationInfoSubject.next({
      ...this.paginationInfoSubject.value,
      itemsPerPage
    });
    await this.loadBlogsFromServer(null, 1);
  }

  async searchBlogs(query: string): Promise<Blog[]> {
    try {
      if (!query.trim()) return [];

      const params = new HttpParams()
        .set('search', query.trim())
        .set('status', 'published');

      const res = await firstValueFrom(
        this.httpClient.get<any>('http://localhost:3000/api/blogs', { params })
      );

      return res.blogs;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }
}
