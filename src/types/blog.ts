export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  tags: string[];
  published: boolean;
}

export interface AdminUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
} 