import { NextApiRequest, NextApiResponse } from "next"
import prismadb from '../../lib/prismadb'

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { items, email } = req.body
    const itemsDetailArr = [];
    for (const id of Object.keys(items)) {
        const individualItem = await prismadb.product.findFirst({
            where: {
                id: id
            }
        })
        // console.log(individualItem)
        itemsDetailArr.push(individualItem)

        // https://localhost:3000/public/images/productImages/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg
    }

    const imageInitialString = `${process.env.HOST}/public/images/productImages/`
    const transformedItems = itemsDetailArr.map(item => ({

        quantity: item !== null ? items[item.id] : 1,
        // quantity: 1,
        price_data: {
            currency: "inr",
            unit_amount: item ? Math.floor(item?.price * 100 * 80) : 0,
            // unit_amount: 10000,
            product_data: {
                name: item?.title,
                description: item?.description,
                // images: [`${imageInitialString}${item?.image}`]
            }
        }

    }))


    console.log(transformedItems, "transformedItems")
    const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,

        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cart`,
        metadata: {
            email,
            // images: JSON.stringify(itemsDetailArr.map(item=>imageInitialString+item?.image)),
        }
    })

    // console.log(items, email)
    console.log("session", session.id)

    res.status(200).json({ id: session.id })
}