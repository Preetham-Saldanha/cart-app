// import React,{useState,useEffect, useRef, useCallback } from 'react'

// function Banner() {

//     const listRef = useRef<HTMLUListElement | null>(null);
//     const observer= useRef<IntersectionObserver>();



//     const scrollCarousal = useCallback( async (index: number) => {
//       console.log(index,"inside sc func")
//       const listNode = listRef.current;
//     //create observer ony if not initially created 
  
       
//       observer.current= new IntersectionObserver(entries=>{
//         if(entries[0].intersectionRatio===1){
//           const imgNode = listNode?.querySelectorAll('img')[index];
      
//           imgNode?.scrollIntoView({
//             behavior: 'smooth',
//             block: 'nearest',
//             inline: 'center'
//           });
//         }
//       })

//       if(listNode!==null)observer.current.observe(listNode)

    
//       // This line assumes a particular DOM structure:
    
//     },[])
  
//    useEffect (() => {
//       var item = 0;
//       // var pointer = 0;
//       const Id = setInterval(() => {
  
//         console.log(item)
        
//         scrollCarousal(item);
//         if (item == 5) item = -1;
//         item++;
  
  
//       }, 6000)
  
//       return () => {
//         clearInterval(Id)
//         if(observer.current) observer.current.disconnect()
//       }
//     }, [])


//   return (
//     <div className='relative flex flex-col items-center'>

//     <ul className='relative flex flex-row overflow-hidden lg:h-96 lg:w-5/6 w-full  m-auto' ref={listRef}>

//       <img className='min-w-full' src="images\cart-banner1.jpg" alt="" />

//       <img className='min-w-full' src="images\cart-banner2.jpg" alt="" />

//       <img className='min-w-full' src="images\cart-banner3.jpg" alt="" />

//       <img className='min-w-full' src="images\cart-banner4.jpg" alt="" />

//       <img className='min-w-full' src="images\cart-banner5.jpg" alt="" />

//       {/* <img className='min-w-full' src="images\cart-banner1.jpg" alt="" /> */}
//     </ul>
//     <div className=' absolute w-full h-24  bottom-0  z-20 bg-gradient-to-t from-gray-500 to-transparent  lg:w-5/6' />


//     {/* <button className='bg-white text-blue-400 p-4' onClick={() => scrollCarousal(4)}>clik this</button> */}
//   </div>
//   )
// }

// export default Banner



// ===========================================================================================================================



import { useState, useEffect } from "react";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    // "https://images.unsplash.com/photo-1546054712-0e84dcdcba29",
    // "https://images.unsplash.com/photo-1559628129-565c6a69bb32",
    // "https://images.unsplash.com/photo-1542281286-9e0a16bb7366",
    // "https://images.unsplash.com/photo-1521747116042-5a810fda9662",
    // "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "images\\cart-banner1.jpg",
    "images\\cart-banner2.jpg",
    "images\\cart-banner3.jpg",
    "images\\cart-banner4.jpg",
    "images\\cart-banner5.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>  
    <div className="relative lg:h-[45vh] md:h-[30vh] h-[20vh]">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <img
            className="h-fit w-full object-cover"
            src={imageUrl}
            alt={`Banner ${index}`}
          />
        </div>
      ))}
    </div>
    <div className=' absolute w-full h-[65%]  bottom-0  z-20 bg-gradient-to-t from-gray-200 to-transparent  ' />

    </>
  );
};

export default Banner;
