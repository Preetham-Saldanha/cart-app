import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../../lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log("hit here")
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { title, price, description, category, image, rate, count, productId, userId, quantity }: {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rate: number,
    count: number

    productId: string,
    userId: string,
    quantity: number
  } = req.body;
  // console.log()
  try {



    const newRating = {
      rate: rate,
      count: count,

    };

    // create a new rating record in the database and get the ID
    const ratingResult = await prismadb.rating.create({
      data: {
        ...newRating,
      },
    });
    const ratingId = ratingResult.id;

    // create a new product object with the ID of the new rating
    let filename = image.split("/")
    const image_url = filename[filename.length - 1]
    console.log("image is ", image_url)

    const newProduct = {

      title: title,
      price: price,
      description: description,
      category: category,
      image: image_url,
      rating: {
        connect: {
          id: ratingId,
        },
      },


    };

    const productResult = await prismadb.product.create({
      data: {
        ...newProduct,
      },
    });
    const productId = productResult.id;
    // create a new cart item with the new product object
    // const result = await prismadb.cartItem.create({
    //   data: {
    //     userId: userId,
    //     quantity: quantity,

    //     product: {connect:{
    //       id:productId
    //     }},
    //   },
    // });

    return res.status(200).json({productResult})
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }


}