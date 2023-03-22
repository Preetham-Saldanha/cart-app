
import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.body
    try {
        const result = await prismadb.cartItem.delete({ where: { id: id } })

        return res.status(200).json({ result })

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }

} 