



export const productResolvers = {
    Query: {
      async getProduct(_, { id }: { id: string }) {
        const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return rows[0];
      },
      async getProducts() {
        const { rows } = await pool.query('SELECT * FROM products');
        return rows;
      },
    },
    Mutation: {
      async createProduct(_, { name, price }: { name: string, price: number }) {
        const { rows } = await pool.query('INSERT INTO products(name, price) VALUES($1, $2) RETURNING *', [name, price]);
        return rows[0];
      },
    },
  };