import Image from 'next/image'
import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import useCurrentUser from '@/hooks/useCurrentUser'
import axios from 'axios';
import { useEffect } from 'react'
import useFirstCartRender from "@/hooks/useFirstCartRender"
import useLatestItems from "@/hooks/useLatestItems"
import useTotalAmount from "@/hooks/useTotalAmount";
import useCustomModal from "@/hooks/useCustomModal";
import { useRouter } from 'next/router';

type ProductType = {
    id: string,
    title: string,
    price: number,
    description: string | null,
    category: string | null,
    image: string,
    rating: {
        rate: number,
        count: number
    }
    fire: (message:string, confirmButtonText:string, cancelButtonText:string)=>Promise<boolean>
}

// address
// : 
// null
// createdAt
// : 
// "2023-03-12T19:20:48.420Z"
// email
// : 
// "preetham@gmail.com"
// emailVerified
// : 
// "2023-03-12T19:20:48.418Z"
// hashedPassword
// : 
// "$2b$12$rh0tK0iFm75tv6n0///CiOeWopVdDhq/eJry1xSuvCmJjfq4LO.cO"
// id
// : 
// "640e26101948381439d5dee0"
// image
// : 
// ""
// name
// : 
// "preetham"
// updatedAt
// : 
// "2023-03-12T19:20:48.420Z"

function Product({ id, title, price, description, category, image, rating: { rate, count }, fire }: ProductType) {

    const router = useRouter()
    const { data: user } = useCurrentUser();
    const { isFirstRender, setIsFirstRender } = useFirstCartRender()
    const { latestItems, setLatestModifiedItems } = useLatestItems();
    const { totalAmount, setTotalAmount }: { totalAmount: number, setTotalAmount: React.Dispatch<React.SetStateAction<number>> } = useTotalAmount();
    
    console.log("userId", user?.id)

    const addToCart = async () => {
        // const userInput = await fire("Do you want to select this product?","Yes","No");
        // if(!userInput){
        //     return
        // }
        try {

            const result = await axios.post("/api/addtocart", { productId: id, userId: user.id, quantity: 1, title, price, description, category, image, rate, count })
            console.log("product added to cart", result)

            if (result.data === null) {
                //display modal to OKAY or move to cart
                const userInput = await fire("Product is already selected in Cart","Ok","Move to cart");
                if (!userInput) {
                    router.push("/cart")
                    console.log("router was hit")
                }
                return
            }
            console.log({ ...latestItems, [id]: 1 })
            setLatestModifiedItems({ ...latestItems, [id]: 1 })
            setTotalAmount(prev => prev + Math.floor(price * 80))

            // setIsFirstRender(true)
        }
        catch (error) {
            console.log(error);

        }
    }

    let stars = [];
    let approxRate = Math.floor(rate)
    for (var i = 1; i <= approxRate; i++) {
        stars.push(<BsStarFill />);
    }

    if (rate > approxRate) stars.push(<BsStarHalf />);

    for (var i = stars.length; i < 5; i++) {
        stars.push(<BsStar />);
    }




    // async function pushToDb() {
    //     const result = await axios.post("/api/addtocart", { title, price, description, category, image, rate, count })
    //     console.log(result)
    // }

    // useEffect(() => {

    //     pushToDb()


    //     return () => {

    //     }
    // }, [])

    const imageUrl = "/images/productImages/" + image;

    return (
        <>
        
        {/* <Modal message='Product is already selected in Cart' confirmButtonText='Ok' cancelButtonText='Move to cart' /> */}
            <div className='flex flex-col  px-5  m-5 bg-white py-4 rounded-md'>
                <p className='w-full text-right font-semibold text-gray-500'>{category}</p>
                <div className='m-auto h-5/12'>  <Image src={imageUrl} height={200} width={200} alt={"non empty"} /></div>

                <div className=''>
                    <p className='font-bold text-lg my-2'>{title}</p>
                    <p className='flex items-center text-blue-700 font-semibold my-2'> {rate}<span className='flex text-pink-600 '>{stars.map(star => star)} </span>{count}</p>
                    <p className='  line-clamp-2 font-medium my-2'>{description}</p>
                    <p className='font-semibold text-xl my-2'>₹{Math.floor(price * 80)}/-</p>
                    <button onClick={addToCart} className="p-3 rounded-md font-semibold w-full text-xl m-auto bg-cyan-500  active:bg-gradient-to-b  active:from-cyan-600 active:to-cyan-500 transition duration-150 active:ring-1">Add to Cart</button>

                </div>
            </div>
            
        </>
    )
}

export default Product