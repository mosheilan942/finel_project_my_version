import productDal from "../../dal/productsDal.js"



export const productResolvers = {
    Query: {
      async getProductByID({ id }: { id: string }) {
        const { rows } = await productDal.getProductByID(id);
        return rows[0];
      },
      async getProductBySearch({ search }: { search: string }) {
        const { rows } = await productDal.getProductBySearch(search);
        return rows[0];
      },
      async getTop5Products() {
        const { rows } = await productDal.getTop5Products();
        return rows;
      },
      async getTop5ForCategory({ name }: { name: string } ) {
        const { rows } = await productDal.getTop5ForCategory(name);
        return rows;
      },
      
    },
    Mutation: {
    //   async createProduct(_, { name, price }: { name: string, price: number }) {
    //     const { rows } = await pool.query('INSERT INTO products(name, price) VALUES($1, $2) RETURNING *', [name, price]);
    //     return rows[0];
    //   },
    },
  };