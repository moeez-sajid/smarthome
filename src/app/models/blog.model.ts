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

export interface ContentBlock {
  type: 'text' | 'image' | 'product' | 'quote' | 'video' | 'code' | 'comparison-table' | 'list';
  heading?: string;
  content?: string;
  products?: ProductItem[];
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  code?: string;
  language?: string;
  items?: Array<{
    text: string;
    link?: string;
  }>;
  tableData?: {
    headers: string[];
    rows: any[][];
  };
  attribution?: string;
}

export interface BlogSection {
  heading: string;
  content: string;
  contentBlocks?: ContentBlock[];
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  category: Category; // Category ID
  author: {username:string}; // User ID
  tags?: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  publishDate: Date;
  slug: string;
  description: string;
  featured: boolean;
  template?: 'standard' | 'product-review' | 'tutorial' | 'news' | 'comparison';
  headerImage?: string;
  sections?: BlogSection[];
  contentBlocks?: ContentBlock[];
  recommendations?: ProductItem[];
  isDeleted: boolean;
  deletedAt?: Date;
  createdBy: string; // User ID
  updatedBy?: string; // User ID
  createdAt: Date;
  updatedAt: Date;
} 