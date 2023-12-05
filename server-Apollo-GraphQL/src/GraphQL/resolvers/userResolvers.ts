


export const userResolvers = {
    Query: {
      async getUser(_, { id }: { id: string }) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
      },
      async getUsers() {
        const { rows } = await pool.query('SELECT * FROM users');
        return rows;
      },
    },
    Mutation: {
      async createUser(_, { username, email }: { username: string, email: string }) {
        const { rows } = await pool.query('INSERT INTO users(username, email) VALUES($1, $2) RETURNING *', [username, email]);
        return rows[0];
      },
    },
  };