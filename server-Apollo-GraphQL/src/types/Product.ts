export default interface Product {
  id: string;
  name: string;
  saleprice: number;
  quantity: number;
  description: string;
  category: string;
  discount: number;
  rating: number;
  click: number;
  coordinate: {
    longitude1: number;
    longitude2: number;
    longitude3: number;
    latitude1: number;
    latitude2: number;
    latitude3: number;
  };
  image: { url: string; alt: string };
  tags: {
    tag: string;
    tag2: string;
  };
}