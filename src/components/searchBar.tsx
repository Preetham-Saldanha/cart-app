import React, { useState } from 'react'
import { BiSearchAlt, BiUserCircle } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import type { ProductType, RatingType } from '@/pages';
import useFilteredProducts from"@/hooks/useFilteredProducts"

function SearchBar() {


    const {query, setQuery, setFilteredProducts} = useFilteredProducts()
    const [queryLocalState, setQueryLocalState] = useState<string>(query) // keeping this duplicate state in order to improve perfomance , this will avoid products to render each time the query changes
    const {data, error, isLoading, mutate} = useSWR(`/api/search?q=${encodeURIComponent(queryLocalState)}`,fetcher)// even though this gets executed and changes "DATA" for each change in querylocalstate

    const handleSearch = (e:React.FormEvent<HTMLFormElement | SVGElement> ) => {
        e.preventDefault()
   
       setQuery(queryLocalState)
        console.log("loding check", isLoading)
        if(!isLoading){
            console.log(data)
            setFilteredProducts(data.result)
        }
        // mutate().then(data=>setFilteredProducts(data.result))
       
    
    }

    const clearSearch =(e:React.MouseEvent<SVGElement> )=>{
        e.preventDefault()
        setQueryLocalState("");
        setQuery("")
    }


    return (
        
        // <div className="flex items-center bg-zinc-600  rounded-md px-3 w-4/12 ">
        <div className=" bg-zinc-600  rounded-md px-3 w-4/12 ">
       <form onSubmit={handleSearch} className="flex items-center">
           
                <BiSearchAlt  onClick={handleSearch} size={30} className="text-zinc-300 hover:scale-110 transform transition duration-200 cursor-pointer" />
               
                <input type="text"
            
                    value={queryLocalState}
                    onChange={e=>setQueryLocalState(e.target.value)}
                    className="
                w-full
                px-3
                py-3 
                rounded-r-md
                bg-zinc-600  
                placeholder:text-zinc-300
                text-white
                text-lg
                ring-0
                outline-none
                " placeholder="search" />
              
                <HiX  onClick={clearSearch} size={30} className="text-zinc-300 hover:scale-110 transform transition duration-200 cursor-pointer" />
       
                </form>
        </div>
    
    )
}

export default SearchBar