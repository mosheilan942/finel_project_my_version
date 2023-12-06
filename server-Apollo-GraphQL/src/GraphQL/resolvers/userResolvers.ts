import userDal from "../../dal/userDal.js"
import User from "../../types/User.js";

interface ResolverArgs {
    user: User;
    userid: string;
    email: string;
}

export const userResolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                const rows = await userDal.getAllUser();
                return rows;
            } catch (error) {
                console.error("Error in getAllUsers resolver:", error);
                throw new Error("Failed to fetch all users");
            }
        },
        getUser: async (_: any, { userid }: ResolverArgs) => {
            try {
                console.log("Fetching user with id:", userid);
                const rows = await userDal.getUser(userid);
                return rows[0];
            } catch (error) {
                console.error("Error in getUser resolver:", error);
                throw new Error("Failed to fetch user");
            }
        },
        getUserByEmail: async (_: any, { email }: ResolverArgs) => {
            try {
                console.log("Fetching user with email:", email);
                const rows = await userDal.getUserByEmail(email);
                console.log(rows);
                
                return rows[0];
            } catch (error) {
                console.error("Error in get user by email resolver:", error);
                throw new Error("Failed to fetch user by email");
            }
        },
    },
    Mutation: {
        addUser: async (_: any, { user }: ResolverArgs) => {
            try {
                const rows = await userDal.addUser(user);
                return rows[0];
            } catch (error) {
                console.error("Error in addUser resolver:", error);
                throw new Error("Failed to add user");
            }
        },
    },
};

