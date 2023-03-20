import React,{useState,useEffect, useRef } from 'react'

function Banner() {

    const listRef = useRef<HTMLUListElement | null>(null);

    const scrollCarousal = async (index: number) => {
      const listNode = listRef.current;
      // This line assumes a particular DOM structure:
      const imgNode = listNode?.querySelectorAll('img')[index];
      imgNode?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  
   useEffect (() => {
      var item = 0;
      // var pointer = 0;
      const Id = setInterval(() => {
  
        console.log(item)
        scrollCarousal(item);
        if (item == 5) item = -1;
        item++;
  
  
      }, 6000)
  
      return () => {
        clearInterval(Id)
      }
    }, [])


  return (
    <div className='relative flex flex-col items-center'>

    <ul className='relative flex flex-row overflow-hidden lg:h-96 lg:w-5/6 w-full  m-auto' ref={listRef}>

      <img className='min-w-full' src="images\cart-banner1.jpg" alt="" />

      <img className='min-w-full' src="images\cart-banner2.jpg" alt="" />

      <img className='min-w-full' src="images\cart-banner3.jpg" alt="" />

      <img className='min-w-full' src="images\cart-banner4.jpg" alt="" />

      <img className='min-w-full' src="images\cart-banner5.jpg" alt="" />

      {/* <img className='min-w-full' src="images\cart-banner1.jpg" alt="" /> */}
    </ul>
    <div className=' absolute w-full h-24  bottom-0  z-20 bg-gradient-to-t from-gray-500 to-transparent  lg:w-5/6' />


    {/* <button className='bg-white text-blue-400 p-4' onClick={() => scrollCarousal(4)}>clik this</button> */}
  </div>
  )
}

export default Banner