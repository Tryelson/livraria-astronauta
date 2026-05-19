export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  publisher?: string;
  categorySlug: string;
  coverUrl: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  synopsis?: string;
};

export type Category = {
  slug: string;
  name: string;
  description?: string;
};

export type SortOption =
  | "title-asc"
  | "price-asc"
  | "price-desc"
  | "discount-desc";

export type CartItem = {
  book: Book;
  quantity: number;
};
