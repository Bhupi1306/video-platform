import React, { useId } from "react";


const TextInput = ({value, setValue}) => {
    const inputId = useId()
    return (
        <>
            <div className="w-full "> 
                <div className="mt-1 ml-4 sm:ml-0">
                    <input value={value || ""} onChange={(e)=>(setValue(e.target.value))} id={inputId} name={inputId} type="text" required placeholder="Search Video"
                    className="block w-full
                     sm:px-3 sm:py-1.5  px-2 py-0.5 
                    text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-300 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                </div>
            </div>
        </>
    )
}


export default TextInput