import React from 'react'
import Layout from '@/components/layout'
import Link from 'next/link'
import { HiCheckCircle } from "react-icons/hi"
function Success() {
  return (
    <div className=''>
      <Layout>
      <div className='  bg-gray-300 min-h-screen '>
        <div className='lg:w-1/2 p-7 m-auto bg-white rounded-lg sm:w-2/3 w-full flex flex-col h-fit'>
          <h1 className='flex gap-3 py-3'>
           <HiCheckCircle  className='text-cyan-500 lg:h-9 lg:w-9 md:h-12 md:w-12  h-16 w-16'/> <span className='font-medium text-2xl'> Thank you your order has been confirmed! </span>
          </h1>
          <p className='font-medium leading-6 p-3'>Thank you for shopping with us, we will send you confirmation once your order has been shipped. If you would like 
            to check the status of your order(s) please press the button below.
             </p>
             <div>

             {/* <button className='p-3 text-center w-full bg-cyan-600 rounded-md '> Go to my orders</button> */}
             <Link href={"/myorders"} className='p-3 text-center inline-block w-full bg-cyan-500 text-white font-medium rounded-md text-lg active:bg-gradient-to-b from-cyan-600 to-cyan-500'> Go to my orders</Link>

             </div>
        </div>
        </div>
      </Layout>
      
      
      </div>
  )
}

export default Success