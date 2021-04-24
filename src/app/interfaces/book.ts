export interface Book {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  author: string;
  publisher?: string;
  published: string;
  isBorrow: boolean;
}
