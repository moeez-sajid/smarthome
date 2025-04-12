import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/core';
import { BlogDataService } from '../services/blog-data.service';
import { Blog } from '../models/blog.model';
import { tap, filter, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogPostResolver implements Resolve<Blog> {
  constructor(
    private blogDataService: BlogDataService,
    private transferState: TransferState,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blog> {
    const slug = route.paramMap.get('slug');
    if (!slug) {
      this.router.navigate(['/not-found']);
      throw new Error('Blog slug is required');
    }

    const BLOG_KEY = makeStateKey<Blog | null>(`blog-${slug}`);

    // Check if we have the data in transfer state (from SSR)
    const cachedBlog = this.transferState.get<Blog | null>(BLOG_KEY, null);
    if (cachedBlog) {
      this.transferState.remove(BLOG_KEY); // Remove after using to free memory
      return of(cachedBlog);
    }

    // If not in transfer state, fetch from API
    return from(this.blogDataService.getBlogBySlug(slug)).pipe(
      tap(blog => {
        // Store in transfer state for future use
        this.transferState.set(BLOG_KEY, blog);
      }),
      catchError(error => {
        console.error('Error resolving blog post:', error);
        this.router.navigate(['/not-found']);
        throw error;
      })
    );
  }
} 