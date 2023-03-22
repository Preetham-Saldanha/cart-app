import React, {useState} from 'react'
import { HiCheckCircle } from "react-icons/hi"
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'

function TotalCostContainer() {

    const [hasGift, setHasGift]= useState<boolean>(false);

    function handleGift(){
        setHasGift(prev=> !prev)
    }

    function handleBuy(){

    }

    return (
        <div className='w-3/12 bg-white p-4 h-fit rounded-md flex flex-col gap-3'>
            <div className='text-sm flex gap-2'>
            <HiCheckCircle size={22} className="text-cyan-700"/>
            <div> <p className='text-cyan-700 '> Your order is eligible for FREE Delivery. </p>
                <p>Select this option at checkout.</p></div>
               

            </div>
            <div>
                <p className='text-xl '>Subtotal (5 items): <span className='font-medium'>₹899</span></p>
                <p className='flex gap-2'> <button onClick={handleGift}> {hasGift ? <ImCheckboxChecked size={15} className="text-blue-600"/> : <ImCheckboxUnchecked size={15} />}</button> This order contains a gift</p>
            </div>
            <button onClick={handleBuy} className='p-3 bg-yellow-400 text-cyan-700 rounded-md '>Proceed to buy</button>
        </div>
    )
}

export default TotalCostContainer