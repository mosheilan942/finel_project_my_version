import userDal from "../../dal/userDal.js"
import User from "../../types/User.js";


export const userResolvers = {
    Query: {
        async getAllUsers() {
            const { rows } = await userDal.getAllUser()
            return rows;
        },
        async getUser({ userid }: { userid: string }) {
            const { rows } = await userDal.getUser(userid)
            return rows[0];
        }
    },
    Mutation: {
        async addUser({ user }: { user: User }) {
            const { rows } = await userDal.addUser(user);
            return rows[0];
        },
    },
};