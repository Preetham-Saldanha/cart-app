import Myinput from "./myInput";
import { BiSearchAlt, BiUserCircle } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Popover, ArrowContainer } from 'react-tiny-popover';



const Navbar: React.FC = () => {

    const router = useRouter();
    const [activeRoute, setActiveRoute] = useState("home");
    const [isShowLogButton, setIsShowLogButton] = useState(false);

    useEffect(() => {
        const path = router.pathname;
        setActiveRoute(path)
    }, [router]);


    return <>

        <div className=" relative w-full  bg-black">
            {/* <div className="absolute w-full h-full bg-black bg-opacity-40"></div> */}
            <div className="flex flex-row items-center justify-between z-10 px-9 py-5">
                <h1 className="text-pink-500 font-bold text-5xl font-mono">Cart-Cart</h1>


                <ul className="text-zinc-500 font-semibold text-2xl flex flex-row w-3/12 justify-around ">

                    <li onClick={() => { router.push({ pathname: "/" }) }} className="hover:text-zinc-200 hover:cursor-pointer transition duration-150 h-full border-pink-500" style={activeRoute === "/" ? { borderBottomWidth: "4px", color: "aqua" } : {}}>Home</li>
                    <li onClick={() => { router.push({ pathname: "/cart" }) }} className="hover:text-zinc-200 hover:cursor-pointer  transition duration-150  border-pink-500 " style={activeRoute === "/cart" ? { borderBottomWidth: "4px", color: "aqua" } : {}}>Cart</li>
                    <li onClick={() => { router.push({ pathname: "/myorders" }) }} className="hover:text-zinc-200 hover:cursor-pointer transition duration-150 border-pink-500 " style={activeRoute === "/myorders" ? { borderBottomWidth: "4px", color: "aqua" } : {}}>My Orders</li>
                </ul>

                <div className="flex items-center bg-zinc-600  rounded-md px-3 w-4/12">
                    <BiSearchAlt size={30} className="text-zinc-300 hover:scale-110 transform transition duration-200 cursor-pointer" />
                    <input type="text"
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
                    <HiX size={30} className="text-zinc-300 hover:scale-110 transform transition duration-200 cursor-pointer" />
                </div>
                <div onClick={() => setIsShowLogButton(prev => !prev)} className="flex flex-col items-center text-zinc-500 text-2xl font-semibold hover:text-zinc-200 hover:cursor-pointer transition duration-150" >

                    <BiUserCircle size={60} className="" />
                    <p>Profile</p>
                </div>
            </div>

        </div>
        <div className="flex justify-end pr-3 h-14">
        <button className="px-8 py-3 mt-2 rounded-md  font-semibold text-lg font-mono bg-zinc-400" style={{  background: "aqua", display: isShowLogButton ? "" : "none" }}>Login</button>

        </div>
   

    </>
}

export default Navbar;