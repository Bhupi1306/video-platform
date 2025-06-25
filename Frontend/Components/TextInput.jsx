import React, { useId } from "react";


const TextInput = ({value, setValue, placeholder}) => {
    const inputId = useId()
    return (
        <>
            <div className="w-full "> 
                <label htmlFor={inputId} className="text-sm font-medium text-gray-900"> Full Name </label>
                <div className="mt-1">
                    <input value={value || ""} onChange={(e)=>(setValue(e.target.value))} id={inputId} name={inputId} type="text" required placeholder={placeholder}
                    className="block w-full px-5 py-3 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-2xl bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                </div>
            </div>
        </>
    )
}


export default TextInput