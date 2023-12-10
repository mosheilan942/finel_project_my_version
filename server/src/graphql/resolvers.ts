import { getUsers } from "../dal/EntrytrackingDal.js";
type User = {
    id: number
    userid: string
    name: string
    login_time: string
}

const resolvers = {
    Query: {
        user:async ():Promise<User[]> => {
            const data = await getUsers()
            return data
        }
    },
}

export default resolvers