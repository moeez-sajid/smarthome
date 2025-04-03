export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdBy: string; // User ID
  updatedBy?: string; // User ID
  createdAt: Date;
  updatedAt: Date;
} 