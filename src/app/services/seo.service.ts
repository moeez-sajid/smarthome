import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Blog } from '../models/blog.model';
import { Category } from '../models/category.model';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultMetaDescription = 'Discover expert smart home guides, product reviews, and DIY projects to transform your home with the latest technology and automation solutions.';
  private readonly defaultMetaTitle = 'Smart Homes Blog | Expert Guides & Product Reviews for Smart Home Enthusiasts';
  private readonly defaultKeywords = ['smart home', 'home automation', 'IoT', 'smart devices', 'home technology'];

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Update basic meta tags for the current page
   */
  updateBasicMetaTags(title: string, description: string, keywords?: string[]): void {
    // Set title
    this.title.setTitle(title);
    
    // Set basic meta tags
    this.meta.updateTag({ name: 'description', content: description });
    
    // Update or add keywords
    const finalKeywords = keywords || this.defaultKeywords;
    this.meta.updateTag({ name: 'keywords', content: finalKeywords.join(', ') });

    // Add viewport meta tag if not present
    if (!this.meta.getTag('name="viewport"')) {
      this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    }

    // Add language meta tag
    this.meta.updateTag({ name: 'language', content: 'English' });
  }

  /**
   * Set all necessary meta tags for a blog post, including Open Graph and Twitter Card
   */
  setPostMetaTags(blog: Blog): void {
    const title = blog.metaTitle || `${blog.title} | ${environment.siteName}`;
    const description = blog.metaDescription || environment.siteDescription;
    const image = blog.headerImage || environment.defaultImage;
    const keywords = blog.keywords || this.defaultKeywords;
    
    // Basic meta tags
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    
    // Open Graph meta tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: this.getFullUrl(`/blog/${blog.slug}`) });
    
    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    
    // Article specific meta tags
    this.meta.updateTag({ property: 'article:published_time', content: blog.publishDate.toISOString() });
    if (blog.publishedAt) {
      this.meta.updateTag({ property: 'article:modified_time', content: blog.publishedAt.toISOString() });
    }
    if (blog.tags) {
      blog.tags.forEach(tag => {
        this.meta.updateTag({ property: 'article:tag', content: tag });
      });
    }
    
    // Add author meta tag
    if (blog.author?.username) {
      this.meta.updateTag({ name: 'author', content: blog.author.username });
    }
    
    this.updateCanonicalUrl(`/blog/${blog.slug}`);
  }

  /**
   * Set category specific meta tags for category pages
   */
  setCategoryMetaTags(categoryName: string, blogs: Blog[]): void {
    const title = `${categoryName} Articles | Smart Homes Blog`;
    const description = `Explore our collection of ${blogs.length} articles about ${categoryName.toLowerCase()}. Find tips, guides, and product reviews for smart home enthusiasts.`;
    const keywords = [...this.defaultKeywords, categoryName.toLowerCase()];
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
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
    const keywords = [...this.defaultKeywords, query.toLowerCase()];
    
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    
    // Set noindex for search pages
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  /**
   * Set home page meta tags
   */
  setHomeMetaTags(): void {
    this.title.setTitle(environment.siteName);
    this.meta.updateTag({ name: 'description', content: environment.siteDescription });
    this.meta.updateTag({ name: 'keywords', content: this.defaultKeywords.join(', ') });
    this.meta.updateTag({ property: 'og:title', content: environment.siteName });
    this.meta.updateTag({ property: 'og:description', content: environment.siteDescription });
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
    this.meta.updateTag({ name: 'keywords', content: this.defaultKeywords.join(', ') });
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
    
    if (isPlatformBrowser(this.platformId)) {
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
  }

  /**
   * Get absolute URL from relative path
   */
  private getFullUrl(relativePath: string): string {
    return `${environment.baseUrl}${relativePath}`;
  }
}
