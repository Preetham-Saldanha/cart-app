import React,{useState,useEffect, useRef, useCallback } from 'react'

function Banner() {

    const listRef = useRef<HTMLUListElement | null>(null);
    const observer= useRef<IntersectionObserver>();



    const scrollCarousal = useCallback( async (index: number) => {
      console.log(index,"inside sc func")
      const listNode = listRef.current;
    //create observer ony if not initially created 
  
       
      observer.current= new IntersectionObserver(entries=>{
        if(entries[0].intersectionRatio===1){
          const imgNode = listNode?.querySelectorAll('img')[index];
      
          imgNode?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      })

      if(listNode!==null)observer.current.observe(listNode)

    
      // This line assumes a particular DOM structure:
    
    },[])
  
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
        if(observer.current) observer.current.disconnect()
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