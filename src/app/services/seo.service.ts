import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Blog } from '../models/blog.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) { }

  /**
   * Update basic meta tags for the current page
   */
  updateBasicMetaTags(title: string, description: string, keywords?: string[]): void {
    // Set title
    this.title.setTitle(title);
    
    // Set basic meta tags
    this.meta.updateTag({ name: 'description', content: description });
    
    if (keywords && keywords.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    }
  }

  /**
   * Set all necessary meta tags for a blog post, including Open Graph and Twitter Card
   */
  setPostMetaTags(blog: Blog): void {
    const title = `${blog.title} | Smart Homes Blog`;
    const description = blog.description;
    const image = blog.headerImage || 'https://yourdomain.com/images/default-blog-image.jpg';
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: this.getFullUrl(`/blog/${blog.slug}`) });
    
    // Add article specific meta tags
    this.meta.updateTag({ property: 'article:published_time', content: blog.publishDate.toISOString() });
    if (blog.publishedAt) {
      this.meta.updateTag({ property: 'article:modified_time', content: blog.publishedAt.toISOString() });
    }
    if (blog.tags) {
      blog.tags.forEach(tag => {
        this.meta.updateTag({ property: 'article:tag', content: tag });
      });
    }
    
    this.updateCanonicalUrl(`/blog/${blog.slug}`);
  }

  /**
   * Set category specific meta tags for category pages
   */
  setCategoryMetaTags(categoryName: string, blogs: Blog[]): void {
    const title = `${categoryName} Articles | Smart Homes Blog`;
    const description = `Explore our collection of ${blogs.length} articles about ${categoryName.toLowerCase()}. Find tips, guides, and product reviews for smart home enthusiasts.`;
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: this.getFullUrl(`/blogs?category=${encodeURIComponent(categoryName)}`) });
    
    this.updateCanonicalUrl(`/blogs?category=${encodeURIComponent(categoryName)}`);
  }

  /**
   * Set search page meta tags and add noindex to prevent search results from being indexed
   */
  setSearchMetaTags(query: string): void {
    const title = `Search results for "${query}" | Smart Homes Blog`;
    const description = `Search results for ${query} on Smart Homes Blog. Find articles, guides, and product reviews.`;
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    
    // Set noindex for search pages
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  /**
   * Set home page meta tags
   */
  setHomeMetaTags(): void {
    const title = 'Smart Homes Blog | Expert Guides & Product Reviews for Smart Home Enthusiasts';
    const description = 'Discover expert smart home guides, product reviews, and DIY projects to transform your home with the latest technology and automation solutions.';
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: this.getFullUrl('/') });
    
    // Allow indexing for home page
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    this.updateCanonicalUrl('/');
  }

  /**
   * Set blog list page meta tags
   */
  setBlogListMetaTags(): void {
    const title = 'Smart Home Blog | Tips, Guides & Reviews';
    const description = 'Discover the latest smart home technology tips, guides, and product reviews. Learn how to make your home smarter and more efficient.';
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: this.getFullUrl('/blogs') });
    
    this.updateCanonicalUrl('/blogs');
  }

  /**
   * Update canonical URL link element
   */
  private updateCanonicalUrl(relativePath: string): void {
    const fullUrl = this.getFullUrl(relativePath);
    
    // Remove any existing canonical links
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Add the canonical link
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'canonical');
    linkElement.setAttribute('href', fullUrl);
    document.head.appendChild(linkElement);
  }

  /**
   * Get absolute URL from relative path
   */
  private getFullUrl(relativePath: string): string {
    // Replace with your actual domain
    return `https://yourdomain.com${relativePath}`;
  }
}
