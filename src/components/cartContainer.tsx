import React, { useState, useEffect } from 'react'
import CartItem from './cartItem'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import useCurrentUser from '@/hooks/useCurrentUser';
// import prismadb from "@/lib/prismadb"
// import { Product } from '@prisma/client';

type CartItem = {
    id: string, quantity: number,

    product: {
        title: string,
        price: number,
        description: string | null,
        category: string | null,
        image: string,
        ratingId: number
    }
}

function CartContainer() {
// {items}: {items:CartItem[]}
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
    // const [items, setItems] = useState<CartItem[]>([])
    function handleSelectAll() {
        setIsSelectAll(prev => !prev)
    }

    const { data: user } = useCurrentUser()

    // async function getItems() {
    //     const result = await prismadb.cartItem.findMany({
    //         where: { id: user.id }
    //     })
    //     console.log(result,"result")
    //     // setItems(result)
    // }

    // useEffect(() => {
    //     getItems()
    // }, [])

    const { data , error, isLoading ,mutate }: { data: {items:CartItem[]}, error: any, isLoading: any , mutate:any} = useSWR('api/getcartitems', fetcher)
// console.log(error)

    console.log(data?.items)
    return (
        <div className='bg-white w-8/12 rounded-md p-5'>

            <div className='flex flex-col gap-1 pl-3  border-b border-gray-200'>
                <h1 className='text-3xl font-medium'>Shopping cart</h1>
                <p className='text-cyan-600 text-sm font-medium flex gap-1' >
                    {!isSelectAll && <span className='text-black'>No items Selected.</span>}
                    <span onClick={handleSelectAll} className='hover:underline hover:text-red-600 cursor-pointer'>
                        {isSelectAll ? "Deselect all items" : "Select All items"}
                    </span>
                </p>


                <p className='text-right pr-4 text-base w-full text-gray-600 font-medium'>Price</p>
            </div>

            {data?.items?.map(item => <CartItem key={item.id} mutate={mutate}
                id={item.id} category={item.product.category}
                description={item.product.description}
                image={item.product.image} price={item.product.price}
                quantity={item.quantity}
                ratingId={item.product.ratingId} title={item.product.title}

            />)}

            <div className='text-right text-xl py-2 pr-4 '>
                Subtotal (5 items):  <span className='font-medium'>₹899</span>
            </div>
        </div>
    )
}

export default CartContainer