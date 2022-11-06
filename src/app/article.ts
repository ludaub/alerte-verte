import { Category } from './category';

export interface Article {
  title: string;
  quote?: string;
  url: string;
  publishedAt: Date;
  publishedBy: string;
  categoryId: string;
}
