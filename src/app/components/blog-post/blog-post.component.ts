import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, Renderer2, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { BlogDataService } from '../../services/blog-data.service';
import { Location } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { Blog, BlogSection, ContentBlock } from '../../models/blog.model';
import { Category } from '../../models/category.model';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit {
  blog: Blog | null = null;
  relatedBlogs: Blog[] = [];
  category: Category | undefined;
  sectionHeadings: { id: string; heading: string }[] = [];
  currentSection: string = '';
  layoutType: 'standard' | 'featured' | 'product-review' | 'tutorial' | 'news' | 'comparison' = 'standard';
  
  @ViewChildren('section') sectionElements!: QueryList<ElementRef>;
  @ViewChild('blogContent') blogContentElement!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router,
    private blogDataService: BlogDataService,
    private renderer: Renderer2,
    private el: ElementRef,
    private location: Location,
    private seoService: SeoService,
    private title: Title,
    private meta: Meta,
    private environmentService: EnvironmentService
  ) { }

  async ngOnInit() {
    // Get the resolved blog post data
    this.blog = this.route.snapshot.data['post'];
    
    if (this.blog) {
      this.category = this.blogDataService.getCategoryById(this.blog.category._id);
      this.relatedBlogs = await this.blogDataService.getRelatedBlogs(this.blog.id, this.blog.category.name);
      this.determineLayoutType();
      this.extractSectionHeadings();
      
      // Set SEO meta tags for the blog post
      this.setMetaTags();
    } else {
      this.router.navigate(['/not-found']);
    }
    
    // Store the return URL if coming from the blog list
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Store previous URL if it's the blog list page
        if (event.url.includes('/blogs') && !event.url.includes('/blog/')) {
          this.onUrlChange(event);
        }
      }
    });
    
    // Handle fragment navigation (for direct links to sections)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Delayed execution to ensure DOM is fully loaded
        setTimeout(() => {
          this.scrollToSection(fragment);
        }, 500);
      }
    });
  }

  private setMetaTags() {
    if (!this.blog) return;

    const title = this.blog.metaTitle || this.blog.title;
    const description = this.blog.metaDescription || this.blog.description;
    const url = `${environment.baseUrl}/blog/${this.blog.slug}`;
    const image = this.blog.headerImage || environment.defaultImage;

    // Set title
    this.title.setTitle(`${title} | ${environment.siteName}`);

    // Set meta description
    this.meta.updateTag({ name: 'description', content: description });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:image', content: image });

    // Set Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  ngAfterViewInit(): void {
    // Set up intersection observer for section highlighting
    if (typeof IntersectionObserver !== 'undefined') {
      const options = {
        root: null,
        rootMargin: '-80px 0px -20% 0px', // Adjust for header height and better sensitivity
        threshold: [0.1, 0.5, 0.75] // Multiple thresholds for better accuracy
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            this.currentSection = entry.target.id;
          }
        });
      }, options);

      // Wait for the DOM to be ready
      setTimeout(() => {
        this.sectionElements.forEach(section => {
          observer.observe(section.nativeElement);
        });
      }, 500);
    }
  }

  determineLayoutType(): void {
    if (this.blog?.template) {
      this.layoutType = this.blog.template;
    }
  }

  getLayoutClass(): string {
    return `layout-${this.layoutType}`;
  }

  extractSectionHeadings(): void {
    if (!this.blog?.sections) return;

    this.sectionHeadings = this.blog.sections.map((section: BlogSection, index: number) => ({
      id: `section-${index}`,
      heading: section.heading
    }));
  }

  navigateBack() {
    // Check if we have a stored URL from the blog list
    this.router.navigateByUrl('');
    // const previousUrl = localStorage.getItem('blogListUrl');
    // if (previousUrl) {
    //   this.router.navigateByUrl(previousUrl);
    // } else {
    //   // If no stored URL, go back to the browser history
    //   this.location.back();
    // }
  }

  scrollToSection(sectionId: string): void {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Get the header height for offset
        const headerOffset = 80; // Approximate header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Smooth scroll to the section
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update current section
        this.currentSection = sectionId;
        
        // Add focus style briefly for better visibility
        this.renderer.addClass(element, 'section-focus');
        setTimeout(() => {
          this.renderer.removeClass(element, 'section-focus');
        }, 2000);
      }
    }, 100);
  }

  // Helper method to check if content has HTML
  hasHtml(content: string): boolean {
    return /<\/?[a-z][\s\S]*>/i.test(content);
  }
  
  // Get content blocks of specific type
  getContentBlocksByType(type: string): ContentBlock[] {
    if (!this.blog || !this.blog.contentBlocks) return [];
    return this.blog.contentBlocks.filter(block => block.type === type);
  }
  
  // Get all content blocks
  getAllContentBlocks(): ContentBlock[] {
    if (!this.blog || !this.blog.contentBlocks) return [];
    return this.blog.contentBlocks;
  }
  
  // Format currency with dollar sign
  formatPrice(price: string | undefined): string {
    if (!price) return '';
    return price.startsWith('$') ? price : `$${price}`;
  }
  
  // Create rating stars array for displaying product ratings
  getRatingStars(rating: number | undefined): number[] {
    if (!rating) return [];
    return Array(Math.floor(rating)).fill(1);
  }
  
  // Get the partial star value (0 to 1) for rating display
  getPartialStar(rating: number | undefined): number {
    if (!rating) return 0;
    return rating % 1;
  }

  getCategoryName(categoryId: string): string {
    const category = this.blogDataService.getCategoryById(categoryId);
    return category ? category.name : 'Uncategorized';
  }

  onUrlChange(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blogListUrl', event.url);
    }
  }
}
