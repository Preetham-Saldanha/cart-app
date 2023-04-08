import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const query = req.query
        console.log(query)
        const queryString: string = typeof query.q==="string" ? query.q: "" 

        try{
        const result = await prismadb.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: queryString,
                            mode: "insensitive"
                        }

                    },
                    {
                        description: {
                            contains: queryString,
                            mode: "insensitive"
                        }
                    },
                    {
                        category: {
                            contains: queryString,
                            mode: "insensitive"
                        }
                    }
                ],
            },
             include:{
                rating:true
             }
        })

        res.status(200).json({query,result})

    } catch(err){
        res.status(500).json({message:"something went wrong!", err:err})
    }



    }
}


