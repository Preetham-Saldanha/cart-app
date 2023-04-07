import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id, quantity } = req.body;

    try {


        const result = await prismadb.cartItem.update({
            where: {
                id: id
            },
            data: {
                quantity: quantity
            }
        })

        res.status(200).json({result})
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }

}