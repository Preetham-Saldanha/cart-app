import React, { useEffect, useState } from 'react'
import { BiSearchAlt, BiUserCircle } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';
import type { ProductType, RatingType } from '@/pages';
import useFilteredProducts from "@/hooks/useFilteredProducts"

function SearchBar() {


    const { query, setQuery, setFilteredProducts } = useFilteredProducts()
    const [debounceQuery, setDebounceQuery] = useState("")

    const getFilteredData = async (userQuery: string) => {
        const data = await fetcher(`/api/search?q=${encodeURIComponent(userQuery)}`)
        console.log(data, "debounce")
        return data.result
    }

    const clearSearch = () => {
        setQuery("")
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceQuery(query)
        }, 500)

        return  ()=>{
            clearTimeout(timer)
        }
    
    }, [query])


    useEffect(() => {
        if (debounceQuery !== "") getFilteredData(debounceQuery).then(res => setFilteredProducts(res))
    }, [debounceQuery])


    return (

        // <div className="flex items-center bg-zinc-600  rounded-md px-3 w-4/12 ">
        <div className=" flex items-center bg-zinc-600  rounded-md px-3 w-4/12 ">
            {/* <form onSubmit={handleSearch} className="flex items-center"> */}

            <BiSearchAlt size={30} className="text-zinc-300 hover:scale-110 transform transition duration-200 cursor-pointer" />

            <input type="text"

                value={query}
                onChange={e => setQuery(e.target.value)}
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

            <HiX onClick={clearSearch} size={30} className="text-zinc-300 hover:scale-110 transform transition duration-200 cursor-pointer" />

            {/* </form> */}
        </div>

    )
}

export default SearchBar