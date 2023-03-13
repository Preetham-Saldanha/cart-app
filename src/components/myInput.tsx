import React from "react";
interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type: string;
}
const Myinput: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
    return (
        <div className="relative">
            <input
                value={value}
                type={type}
                onChange={onChange}
                id={id}
                className="block
                rounded-md
                px-6
                pt-6
                pb-1
                bg-neutral-800
                text-pink-500
                focus:ring-0
                focus:outline-none
                appearance-none
                text-lg
                peer
                w-full"
                autoComplete="off"
                placeholder=" " />

            <label
                className="absolute
                          text-lg
                          text-zinc-400
                          top-4
                          left-6
                          z-10
                          transform
                          -translate-y-3
                          scale-75
                          duration-150
                          origin-[0]
                          peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0
                          peer-focus:-translate-y-3
                          peer-focus:scale-75
                         " htmlFor={id}>{label}</label>
        </div>
    )
}

export default Myinput;