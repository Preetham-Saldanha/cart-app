import CartContainer from '@/components/cartContainer';
import CartItem from '@/components/cartItem';
import Layout from '@/components/layout'
import TotalCostContainer from '@/components/totalCostContainer';
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React,{useState, useEffect} from 'react'
import prismadb from "../lib/prismadb"
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import useTotalAmount from "@/hooks/useTotalAmount";
import useFirstCartRender from "@/hooks/useFirstCartRender"
import useLatestItems from "@/hooks/useLatestItems";

// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";

import {loadStripe} from '@stripe/stripe-js';


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
  , productId:string
}

function Cart() {

  const { data: user } = useCurrentUser();

  
  const { isFirstRender, setIsFirstRender } = useFirstCartRender()
  const { totalAmount, setTotalAmount } = useTotalAmount();
  const { data, error, isLoading, mutate }: { data: { items: CartItem[] }, error: any, isLoading: any, mutate: any } = useSWR('api/getcartitems', fetcher)
  const { latestItems, setLatestModifiedItems } = useLatestItems();

  // console.log("runss", data?.items)
// console.log(isFirstRender,"First rendeer")
  useEffect(()=>{
  // mutate()
  console.log("data mutattion", data, isFirstRender)

  if (!isLoading && isFirstRender) {
      let initialSum = data?.items?.reduce((acc, item) => acc + Math.floor(80 * item.product.price), 0)
      let initialModifiedItems: any = {}
      data?.items?.forEach(item => initialModifiedItems[item.productId] = item.quantity)
      // console.log(initialSum)
      console.log("initial obj", initialModifiedItems)
      setLatestModifiedItems(initialModifiedItems);
      console.log(initialSum)
      setTotalAmount(initialSum)
      setIsFirstRender(false)

  }

},[isLoading,isFirstRender]
  )



  // console.log(data)
  return (

    <Layout>
      <div className=' relative bg-gray-300 min-h-screen'>
        <div className='flex  w-10/12 m-auto gap-5  p-8 '>
          <CartContainer  isLoading={isLoading} items={data?.items} mutate={mutate}/>
          <TotalCostContainer noOfItems={data?.items?.length} isLoading={isLoading}/>
        </div>
        
      </div>
    </Layout>
  )
}

export default Cart
// export async function getServerSideProps(context: NextPageContext) {

//   let items: any = []
//   try{
//   const session = await getSession(context);

//   const user = await prismadb.user.findFirst({
//     where: {
//       email: session?.user?.email
//     }
//   })



//   if (user) {
//     items = await prismadb.cartItem.findMany({
//       where: {
//         userId: user.id
//       },
//       include: {
//         product: true
//       }
//     })
//   }
// console.log(items)
// } catch(error){
//   console.log(error)
   
// }
//   return {
//     props: { items }
//   }
// }


