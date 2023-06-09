

import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GiCheckMark } from 'react-icons/gi'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import axios from 'axios'
import useTotalAmount from "@/hooks/useTotalAmount";
import useFirstCartRender from "@/hooks/useFirstCartRender"
import useLatestItems from "@/hooks/useLatestItems"
import useCustomModal from "@/hooks/useCustomModal";

// import prismadb from '@/lib/prismadb'
// import { PrismaClient } from '@prisma/client'
// {
//     id: '6418ade36d9e722968a146e7',
//     userId: '640e26101948381439d5dee0',
//     quantity: 1,
//     productId: '6417ec4a7cd622cdb6a5af1f',
//     product: {
//       id: '6417ec4a7cd622cdb6a5af1f',
//       title: 'White Gold Plated Princess',
//       price: 9.99,
//       image: '71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
//       description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
//       category: 'jewelery',
//       ratingId: '6417ec497cd622cdb6a5af1e'
//     }
//   }

function CartItem({ id, quantity, title, price, image, description, category, ratingId, mutate, productId }: {
    id: string, quantity: number, title: string,
    price: number,
    description: string | null,
    category: string | null,
    image: string,
    ratingId: number,
    mutate: () => any,
    productId: string,
    setLatestModifiedItems?: React.Dispatch<React.SetStateAction<{
        id: number;
    } | undefined>>
}) {

    // const [noItemsSelected, setNoOfItemsSelected] = useState<number>(quantity)
    const [isSelected, SetIsSelected] = useState<boolean>(true)
    const [hasGift, setHasGift] = useState<boolean>(false)
    const { isFirstRender, setIsFirstRender } = useFirstCartRender()
    const { latestItems, setLatestModifiedItems } = useLatestItems();
    const { totalAmount, setTotalAmount }: { totalAmount: number, setTotalAmount: React.Dispatch<React.SetStateAction<number>> } = useTotalAmount()
    const imageUrl = "/images/productImages/" + image;
    const { Modal, fire } = useCustomModal();
    const dropDownArr = []
    for (var i = 1; i <= 10; i++) {
        dropDownArr.push(i)
    }


    const increaseQuantity = () => {
        // setNoOfItemsSelected(prev => prev + 1)
        setTotalAmount(prev => prev + Math.floor(price * 80))

        setLatestModifiedItems({ ...latestItems, [productId]: latestItems[productId] + 1 })
        console.log(latestItems)

    }

    const decreaseQuantity = () => {
        if (latestItems[productId] == 1) {
            handleDelete();
            return
        }
        // setNoOfItemsSelected(prev => prev - 1);
        setTotalAmount(prev => prev - Math.floor(price * 80))
        const newQuantity = latestItems.id - 1
        setLatestModifiedItems({ ...latestItems, [productId]: latestItems[productId] - 1 })
    }

    async function handleDelete() {
        const userInput = await fire("Do you want to delete this item?");
        if (!userInput) {
            return
        }

        try {
            const result = await axios.post("api/deletecartitem", { id: id })
            console.log(result)
            const mutatedResult = await mutate();
            // setIsFirstRender(true)
            // console.log(mutate)
            const newList = latestItems
            delete newList[id]
            console.log(newList, "total before deleting", Math.floor(price * 80 * latestItems[id]), latestItems[id])

            setTotalAmount(prev => prev - Math.floor(price * 80 * latestItems[productId]))
            setLatestModifiedItems({ ...newList })
        } catch (err) {
            console.log(err)
        }
    }

    async function handleUpdate() {
        const userInput = await fire(`Do you want to update this item?`);
        if (!userInput) {
            return
        }

        try {


            const result = await axios.post("api/updatecartitem", { id: id, quantity: latestItems[productId] })
            console.log(result)
            // if (result) setIsFirstRender(true)
            mutate()
        } catch (err) {
            console.log(err)
        }

    }

    function handleSelected() {
        if (isSelected) {
            setTotalAmount(prev => prev - Math.floor(price * 80 * latestItems[productId]))
        } else {
            setTotalAmount(prev => prev + Math.floor(price * 80 * latestItems[productId]))

        }
        SetIsSelected(prev => !prev)
    }

    function handleGift() {
        setHasGift(prev => !prev)
    }

    return (
        <>    <Modal  />

            <div className='p-3'>
                <div className='border-b border-gray-200 py-4 flex justify-between'>
                    <div className='flex justify-around gap-4  md:w-7/12 lg:w-6/12'>


                        <div className='flex w-2/3 md:w-1/2 lg:w-1/3 justify-around'>
                            <div className='flex  flex-col justify-center  text-cyan-600 '>
                                <button onClick={handleSelected}  > {isSelected ? <ImCheckboxChecked size={25} /> : <ImCheckboxUnchecked size={25} />}</button>
                            </div>

                            <div>

                                <Image width={140} height={140} src={imageUrl} alt="no image" />
                                <div className='bg-slate-100  flex justify-between my-2 rounded-lg text-2xl  font-semibold border-2 border-cyan-500'>
                                    <button disabled={!isSelected} onClick={decreaseQuantity} className=' w-1/3 py-1 text-cyan-500 border-2 border-r-cyan-500 rounded-l-lg active:bg-gray-400 text-center bg-gray-200 transition duration-50'>
                                        {latestItems[productId] === 1 ? <RiDeleteBinLine className='m-auto' /> : "-"}</button><span className='py-1'>{latestItems[productId]}</span>
                                    <button disabled={!isSelected} onClick={increaseQuantity} className='w-1/3 py-1  text-cyan-500 border-l-cyan-500 border-2 rounded-r-lg active:bg-gray-400 bg-gray-200 transition duration-50'>+</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between gap-3 lg:w-2/3'>
                            <div>
                                <p className='text-2xl font-sans text-gray-700 font-medium'>{title}</p>
                                <p className='text-sm text-cyan-700 font-semibold'> In Stock</p>
                                <p className='text-lg font-medium text-gray-700'>Eligible for FREE shipping</p>
                            </div>
                            {/* <select name="" id="" value={noItemsSelected} onChange={(e) => setNoOfItemsSelected(e.target.value)} className="w-15 text-white p-1 rounded-md  bg-slate-400">
                        {dropDownArr.map(single => <option value={single} label={single.toString()} key={single} className="text-slate-400 bg-white"/>)}
                    </select> */}
                            <div>
                                <p className='flex gap-1 items-center text-pink-500 font-semibold font-mono'> <GiCheckMark className='text-green-600 ' />Cart-Cart <span className='italic text-cyan-600 font-sans'>Fullfilled</span></p>
                                <p className='text-sm  flex items-center gap-1'> <button onClick={handleGift}> {hasGift ? <ImCheckboxChecked size={12} className="text-cyan-600" /> : <ImCheckboxUnchecked size={12} className="text-cyan-600" />}</button> This wil be a gift</p>
                            </div>

                            <div className=' flex gap-3 text-lg font-medium'>
                                <button className='p-2 hover:underline text-cyan-700' onClick={handleDelete}>delete</button>
                                {quantity !== latestItems[productId] && <button className='text-cyan-700 bg-yellow-400 p-2 rounded-lg hover:underline active:ring-1' onClick={handleUpdate}>update</button>}
                            </div>
                        </div>

                    </div>

                    <div >
                        <p className='font-semibold text-xl my-2'>₹{Math.floor(price * 80)}/-</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem