import { useState } from "react";
import { createPortal } from "react-dom";


function Popup() {

    const [handleConfirm, setHandleConfirm] = useState<() => void>()
    const [handleCancel, setHandleCancel] = useState<() => void>()
    const [showPopup, setShowPopup] = useState<boolean>()



    const fire: () => Promise<boolean> = () => {
        setShowPopup(true);

        return new Promise((resolve, reject) => {
            const onConfirm = () => {
                return () => {
                    setShowPopup(false);
                    resolve(true);

                }
            }

            const onCancel = () => {
                return () => {
                    setShowPopup(false);
                    resolve(false);
                }
            }

            setHandleConfirm(onConfirm);
            setHandleCancel(onCancel);
        })

    }

    const Modal = ({message,confirmButtonText, cancelButtonText}: {message: string,confirmButtonText: string, cancelButtonText: string}) => {

        return <>
        { showPopup &&  createPortal( <div className="fixed z-40 top-0 w-full h-full ">
            <div className="bg-black opacity-40  w-full h-full md:none sm:none">   </div>
            <div className=" absolute top-0  w-[90%] ml-[5%] mt-[10%] h-60%  sm:mt-8   sm:w-[80%] sm:ml-[10%] sm:h-[35%]  lg:mt-[10%]   lg:w-[40%]  lg:ml-[50%] lg:-left-[20%]    lg:h-1/3 z-50 bg-white rounded-lg p-7 flex flex-col items-center gap-4 pt-20">
                <h1 className="font-mono font-semibold text-cyan-700 text-2xl text-center">{message}</h1>
                <div className="flex justify-around text-xl font-medium  gap-6 ">
                    <button onClick={handleConfirm} className="bg-yellow-400 text-cyan-700 p-3 px-5 rounded-md ">{confirmButtonText}</button>
                    <button onClick={handleCancel} className="bg-yellow-400 text-cyan-700 p-3 px-5 rounded-md"> {cancelButtonText}</button>
                </div>
            </div>
         
        </div>, document.body) }
        </>
    }

    return { fire, Modal};


}


export default Popup;
