import { NextApiRequest, NextApiResponse } from "next";


import serverAuth from "@/lib/serverAuth";
type User = {
    id: String,
    name: String,
    image?: String,
    email?: String,
    emailVerified?: Date,
    hashedPassword?: String
    createdAt?: Date
    updatedAt: Date
    address?: String
    orderIds?: String[]
    cartProductIds?: String[]
    sessions: any
    accounts: any
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        
        const currentUser = await serverAuth(req);
        // console.log("currentUser", currentUser)
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(401).end()
    }
}