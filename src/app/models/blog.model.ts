import { SafeResourceUrl } from "@angular/platform-browser";
import { Category } from "./category.model";

export interface ProductItem {
  title: string;
  description?: string;
  link?: string;
  image?: string;
  price?: string;
  rating?: number;
  specs?: Map<string, string>;
}
export interface heading {
  text: string;
  link?: string;
}
export interface image {
  url: string;
  alt: string;
  caption?: string;
  link?: string;
}
export interface video {
  url: SafeResourceUrl;
  caption?: string;
  link?: string;
}
export interface quote {
  text: string;
  author?: string;
  link?: string;
}
export interface comparisonTable {
  headers: string[];
  rows: any[][];
}
export interface numberedList {
  items: string[];
}
export interface unorderedList {
  items: string[];
}
export interface internalArticleLink {
  text: string;
  link: string;
}
export interface code {
  language?: string;
  code: string;
}
export interface text {
  content: string;
  format?: 'paragraph' | 'blockquote' | 'pre';
}
export interface ContentBlock {
  type: 'heading' | 'rich-text'| 'text' | 'content-break' | 'text-break' | 'image' | 'video' | 'quote' | 'product' | 'code' | 'comparison-table' | 'numbered-list' | 'unordered-list' | 'product-carousel' | 'recommended-products' | 'internal-article-link' | htmlContent;
  content?: string | heading | ProductItem | ProductItem[] | image | video | quote | comparisonTable | numberedList | unorderedList | internalArticleLink | text | htmlContent;
  makeTableOfContents?: boolean;
}

export interface htmlContent{
  html:string
}
export interface Blog {
  _id: string;
  title: string;
  content: string;
  category: Category; // Category ID
  author: {username:string}; // User ID
  tags?: string[];
  keywords?: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  publishDate: Date;
  slug: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
  template?: 'standard' | 'product-review' | 'tutorial' | 'news' | 'comparison';
  headerImage?: string;
  contentBlocks?: ContentBlock[];
  recommendations?: ProductItem[];
  isDeleted: boolean;
  deletedAt?: Date;
  createdBy: string; // User ID
  updatedBy?: string; // User ID
  createdAt: Date;
  updatedAt: Date;
} 