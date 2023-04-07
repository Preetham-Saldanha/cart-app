import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from '../../lib/prismadb'
import { Order } from "@prisma/client";


function transformOrderItems(ordersArr: any) {
    let result = [];
console.log(ordersArr)
    for (let order of ordersArr) {

        let orderDetails: any = { id: order.checkout_event_id, amount: order.amount, createdAt: order.createdAt,  }

        let items: any = []
        for (let item of order.orderItems) {
         

            items.push({ id:item.productId,image: item.product.image, price: Math.floor(item.product.price * 80), quantity: item.quantity })


        }

        orderDetails["items"] = items
        result.push(orderDetails);

    }

    return result;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let orderItems: any = []
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
        // console.log("user",currentUser)


        orderItems = await prismadb.order.findMany({
            where: {
                email: session.user.email
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        })

        const result =  transformOrderItems(orderItems)

        console.log(result, "ordersss")
        return res.status(200).json({ result })
    } catch (error) {
        console.log(error);

        return res.status(400).end();
    }

}