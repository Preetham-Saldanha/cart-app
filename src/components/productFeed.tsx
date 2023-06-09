import axios from 'axios';
import React, { useEffect } from 'react';
import Product from './product';
import useCustomModal from "@/hooks/useCustomModal";



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
}

function ProductFeed({ products }: { products: ProductType[] }) {

    const { Modal, fire }  = useCustomModal();

    return (
        <>   
            <Modal    />
            <div className='relative grid grid-flow-dense md:grid-cols-2 lg:grid-cols-3 md:-mt-32 lg:-mt-44  -mt-10 z-30 w-5/6 m-auto'>

                {products?.map(product =>
                    <Product key={product.id} title={product.title}
                        id={product.id} description={product.description}
                        category={product.category} image={product.image}
                        price={product.price} rating={product.rating}   fire={fire} />
                      
                )}
            </div>
        </>
    )
}

export default ProductFeed