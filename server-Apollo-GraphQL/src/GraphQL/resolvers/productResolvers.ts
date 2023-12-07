import ProductDAL from "../../dal/productsDal.js";
import Product from "../../types/Product.js";
import Category from "../../types/Category.js";

interface ResolverArgs {
  id: string;
  search: string;
  name: string;
}

export const productResolvers = {
  Query: {
    async getProductByID(_: any, { id }: ResolverArgs): Promise<Product | null> {
      try {
        const product = await ProductDAL.getProductByID(id);
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
        return product;
      } catch (error) {
        throw new Error(`Failed to fetch product with ID: ${id}`);
      }
    },
    async getProductBySearch(_: any, { search }: ResolverArgs): Promise<Product[] | null> {
      try {
        const products = await ProductDAL.getProductBySearch(search);
        if (!products || products.length === 0) {
          throw new Error(`No products found for search term: ${search}`);
        }
        return products;
      } catch (error) {
        throw new Error(`Failed to fetch product by search term: ${search}`);
      }
    },
    async getTop5Products(): Promise<Product[]> {
      try {
        const products = await ProductDAL.getTop5Products();
        return products;
      } catch (error) {
        throw new Error(`Failed to fetch top 5 products`);
      }
    },
    async getTop5ForCategorys(): Promise<Category[] | undefined> {
      try {
        const category = await ProductDAL.getTop5ForCategorys();
        return category;
      } catch (error) {
        throw new Error(`Failed to fetch top 5 products for category`);
      }
    },
    async getCategoryByName(_: any, { name }: ResolverArgs): Promise<Category | undefined> {
      try {
        const category = await ProductDAL.getCategoryByName(name);
        return category;
      } catch (error) {
        throw new Error(`Failed to fetch top 5 products for category: ${name}`);
      }
    },
  }
};

