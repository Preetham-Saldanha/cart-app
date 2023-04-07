import React, { useState } from 'react'
import { HiCheckCircle } from "react-icons/hi"
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import useTotalAmount from "@/hooks/useTotalAmount";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
// import { useSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLatestItems from "@/hooks/useLatestItems"

const spKey = process.env.stripe_public_key ? process.env.stripe_public_key : ""
const stripePromise = loadStripe(spKey)

function TotalCostContainer({ noOfItems, isLoading }: { noOfItems: number, isLoading: boolean }) {

    const [hasGift, setHasGift] = useState<boolean>(false);
    const { totalAmount, setTotalAmount } = useTotalAmount();
    const { latestItems, setLatestModifiedItems } = useLatestItems();
    const { data: user } = useCurrentUser();
    function handleGift() {
        setHasGift(prev => !prev)
    }

    const createCheckoutSession = async () => {

        // call the backend to create a checkout session
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: latestItems,
            email: user?.email
        })
        // redirect to stripe checkout

        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result?.error) {
            alert(result.error.message)
        }
    }


    if (!isLoading) return (
        <div className='w-3/12 bg-white p-4 h-fit rounded-md flex flex-col gap-3'>
            <div className='text-sm flex gap-2'>
                <HiCheckCircle size={22} className="text-cyan-700" />
                <div> <p className='text-cyan-700 '> Your order is eligible for FREE Delivery. </p>
                    <p>Select this option at checkout.</p></div>
            </div>
            
            <div>
                <p className='text-xl '>Subtotal ({noOfItems} items): <span className='font-medium'>₹{totalAmount}</span></p>
                <p className='flex gap-2'> <button onClick={handleGift}> {hasGift ? <ImCheckboxChecked size={15} className="text-blue-600" /> : <ImCheckboxUnchecked size={15} />}</button> This order contains a gift</p>
            </div>
            <button onClick={createCheckoutSession} className='p-3 bg-yellow-400 text-cyan-700 rounded-md '>Proceed to buy</button>
        </div>
    )

    return <></>
}

export default TotalCostContainer