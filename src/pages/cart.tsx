import CartContainer from '@/components/cartContainer';
import CartItem from '@/components/cartItem';
import Layout from '@/components/layout'
import TotalCostContainer from '@/components/totalCostContainer';
import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react'
import prismadb from "../lib/prismadb"
// import useSWR from 'swr'
// import fetcher from '@/lib/fetcher';

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

function Cart() {

  const { data: user } = useCurrentUser();


  // console.log(data)
  return (

    <Layout>
      <div className='bg-gray-300 min-h-screen'>
        <div className='flex  w-10/12 m-auto gap-5  p-8 '>
          <CartContainer  />
          <TotalCostContainer />
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


