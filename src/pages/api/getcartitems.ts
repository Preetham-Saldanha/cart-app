
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from '../../lib/prismadb'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

let items: any=[]
try {
    const session = await getSession({ req })
// console.log("i am here")
    if (!session?.user?.email) {
        throw new Error("Not signed in");

    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    });
    // console.log("serverAuth",currentUser)
    if (!currentUser) {
        throw new Error('Not signed in');
    }
    console.log("user",currentUser)

    
         items = await prismadb.cartItem.findMany({
            where: {
                userId: currentUser.id
            },
            include: {
                product: true
            }
        })

        return res.status(200).json({ items })
    } catch (error) {
        console.log(error);
       
        return res.status(400).end();
    }

}