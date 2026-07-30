export interface Material {
  id: string;
  category: string;
  code: string;
  name: string;
  color: string;
  size: string;
  weight: number;
  price: number;
  image: string;
  description: string;
}

export const CATEGORY_ORDER = [
  "Blank Products",
  "Key Rings & Charms",
  "Cards",
  "Gift Boxes",
] as const;

export type Category = (typeof CATEGORY_ORDER)[number];
