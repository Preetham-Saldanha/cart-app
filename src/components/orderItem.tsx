import React from 'react'

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

function OrderItem({ id, amount, createdAt, items }: OrderType) {
  return (
    <div className='rounded-xl flex flex-col mt-5 font-mono'>
      <div className=' flex flex-row bg-slate-200 rounded-t-xl py-8'>
        <div className='w-1/3 flex flex-row pl-6 gap-8'>

          <div className='flex flex-col justify-between'>
            <p className='font-medium text-xl'> ORDER PLACED </p>
            <p className='text-lg'> {new Date(createdAt).toDateString().substring(3)}</p>
          </div>

          <div className='flex flex-col '>
            <p className='font-medium text-xl'> TOTAL </p>
            <p className='text-lg'> ₹{amount}</p>
          </div>
        </div>
        <div className='w-2/3 flex-col flex items-end pr-4 bottom-4 relative'>
          <p className=' font-medium text-xl'>ORDER <span className='font-normal text-base'>{id}</span></p>
          <p className='text-cyan-700 font-medium text-xl'> {items.length} items </p>
        </div>

      </div>

      <div className='flex flex-row gap-3 p-6  flex-wrap border-t-0 border border-slate-200 rounded-b-xl box-content'>
        {items.map(item => {
          return <div key={item.id} className='h-fit w-[200px] object-contain box-content'>
            <img  src={`/images/productImages/${item.image}`} />
          </div>
        }
        )}
      </div>
    </div>
  )
}

export default OrderItem