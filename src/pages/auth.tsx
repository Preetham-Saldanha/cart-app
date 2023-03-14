import React, { useCallback, useState } from "react";

import Myinput from "@/components/myInput";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";

const Auth = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [variant, setVariant] = useState("login");

    
    const toggleVariant = useCallback(
        () => {
            setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
        }, []
    )

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email, password, name
            })
        } catch (err) {
            console.log(err)
        }
        router.push('/')
    }, [email, name, password])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email, password, redirect: false, callbackUrl: "/"
            })
            router.push('/');
        } catch (err) {
            console.log(err)
        }
    }, [email, name, password])


    return <div className="relative w-full h-full min-h-screen  bg-[url(/images/bruno-kelzer-LvySG1hvuzI-unsplash.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="relative w-full h-full min-h-screen bg-black lg:bg-opacity-60">
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-60 p-16 self-center mt-28 rounded-md lg:w-2/5">
                    <h2 className="text-pink-500 font-bold text-2xl mb-4">{variant === "login" ? "Sign in" : "Register"}</h2>
                    <div className="flex flex-col gap-4">
                        {variant == "register" &&
                            <Myinput onChange={(e: any) => setName(e.target.value)} value={name} id="name" label="Username" type="text" />
                        }
                        <Myinput onChange={(e: any) => setEmail(e.target.value)} value={email} id="Email" label="Email" type="email" />
                        <Myinput onChange={(e: any) => setPassword(e.target.value)} value={password} id="password" label="Password" type="password" />

                        <button onClick={variant === "login" ? login : register} className="w-full py-3 mt-4 rounded-md bg-pink-800 text-zinc-300 hover:bg-pink-700 hover:text-white transition text-xl font-semibold">{variant === "login" ? "Login" : "Register"}</button>
                        <button onClick={() => signIn('google', { callbackUrl: "/" })} className="w-full  mt-6 rounded-md bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white transition text-xl font-semibold" ><div className="py-3"><FcGoogle size={30} className="inline mr-1" />Google</div></button>
                        {/* <div className="flex flex-row items-center gap-4 mt-6 justify-center">
                            <div className="w-10 h-10 rounded-full transition hover:opacity-70 bg-white items-center flex justify-center">
                            <FcGoogle size={30}/>
                            </div>

                        </div> */}
                        {/* common */}
                        <p className="text-zinc-400 text-lg "> {variant === 'login' ? "First time using cart-it-off?" : "Already have an account?"}
                            <span className="text-pink-500 font-semibold hover:underline cursor-pointer" onClick={toggleVariant}>
                                {variant === 'login' ? " Create an account" : " Log in"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Auth;