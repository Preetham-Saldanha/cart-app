import Layout from '@/components/layout'
import React from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import { OrderItem } from '@prisma/client';
import Order from '@/components/orderItem';

type OrderType = {

    id: string,
    amount: number,
    createdAt: Date,
    items: ItemType[]
  
  }
  
  type ItemType = {
    id: string
    image: string,
    price: number,
    quantity: number
  
  }

function myorders() {


    const { data, error, isLoading, mutate }: { data: { result: OrderType[] }, error: any, isLoading: any, mutate: any } = useSWR('api/getorders', fetcher)

    if (!isLoading) console.log(data)

    return (
        <div>
            <Layout>
                <div className='w-2/3 m-auto '>
                    <h2 className=' mt-4 text-3xl font-medium font-sans border-b-4 border-cyan-600 pb-3'>Your Orders</h2>
                    <p className='text-xl font-normal font-sans py-2'>{data?.result?.length} Orders</p>
                    {data?.result.map(order => <Order key={order.id} id={order.id} amount={order.amount} createdAt={order.createdAt} items={order.items}/>)}
                </div>
            </Layout>
        </div>
    )
}

export default myorders