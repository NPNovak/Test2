export interface Goods {
  id: number;
  name: string;
  category: string;
  attributes: Attributes[];
}

interface Attributes {
  price: number;
  brand: string;
  origin: string;
  size: string;
  model: string;
  type: string;
  link: string;
}
