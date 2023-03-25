import React, { useState, useEffect, useContext } from 'react'
import CartItem from './cartItem'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import useCurrentUser from '@/hooks/useCurrentUser';
import useTotalAmount from "@/hooks/useTotalAmount";
import useFirstCartRender from "@/hooks/useFirstCartRender"
import useLatestItems from "@/hooks/useLatestItems"
// import Product from './product';
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
    productId:string
}



function CartContainer({ items, mutate, isLoading }: { items: CartItem[], mutate: any, isLoading: boolean }) {

    const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
    // const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const { isFirstRender, setIsFirstRender } = useFirstCartRender()
    const { totalAmount, setTotalAmount } = useTotalAmount();

    const { latestItems, setLatestModifiedItems } = useLatestItems();
    // contains items whose id is mapped to quantity



    function handleSelectAll() {
        setIsSelectAll(prev => !prev)
    }
    // console.log("initial", items)


    useEffect(() => {


    }, [isLoading, isFirstRender])




    // console.log(items)
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

            {items?.map(item => <CartItem key={item.id} mutate={mutate}
                id={item.id} category={item.product.category}
                description={item.product.description}
                image={item.product.image} price={item.product.price}
                quantity={item.quantity}
                ratingId={item.product.ratingId} title={item.product.title}
                setLatestModifiedItems={setLatestModifiedItems}
                productId={item.productId}
            />)}

            <div className='text-right text-xl py-2 pr-4 '>
                Subtotal ({items?.length} items): <span className='font-medium'>₹{totalAmount}</span>
            </div>
        </div>
    )
}

export default CartContainer