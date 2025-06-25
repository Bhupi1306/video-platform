import React, { useEffect, useId, useRef, useState } from "react";
import { backendRequest } from "./backendRequest";

const Categories = ({name, id, setRerender}) => {
    const [value, setValue] = useState(name)
    
    const [isEditable, setIsEditable] = useState(false)
    const focusOn = useRef(null)

    const categoryId = useId()

    useEffect(() =>{
        if(!name){
            setIsEditable(true)
            focusOn.current.focus()
        }
    },[])

    const handleEditClick = () =>{
        setIsEditable(!isEditable)
        focusOn.current.focus()
    } 

    const handleSubmit = async () => {
        if(!value)
        {
            focusOn.current.reportValidity()
            return
        }

            setIsEditable(!isEditable)
            focusOn.current.blur()
            const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/add`, "POST", {id, category: value})
            if(result.success){
            }
            else{
                alert("Something went wrong")
                console.log(result.error)
            }
    }

    const handleEnter = async (e) => {
        if(e.key == "Enter")
        {
            await handleSubmit()
        }
    }

    const handleDelete = async() => {
        await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/delete`, "POST",  {id})
        setRerender(prev => prev + 1)
    }



    return (
        <>
            <div className="w-xl mx-auto mt-2"> 
                <div className="w-full "> 
                    <div className="mt-1 relative">
                        <input ref={focusOn} value={value || ""} onKeyDown={(e) => {handleEnter(e)}} onChange={(e)=>(setValue(e.target.value))} id={categoryId} name={categoryId} type="text" required={true} readOnly={!isEditable}
                        className={`required block w-full px-5 py-3 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-2xl bg-gray-50 focus:outline-none ${isEditable? " focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" : " " }`}/>
                        <div className=" absolute top-0 right-0">
                           <div className={`${isEditable?"hidden" : ""}  flex items-center`}>
                             <div className="py-4 px-0 text-gray-400 hover:text-gray-600"  onClick={handleEditClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4.5 h-4.5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.5 3 21l1.5-4.5L16.862 3.487z" />
                            </svg>
                            </div>
                            <div className="py-3 px-2 pr-3 text-red-300 hover:text-red-600" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </div>
                           </div>
                            <div className={`p-3 text-green-300 hover:text-green-500 ${isEditable? " ": "hidden"}`} onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Categories



// Things left to do: 
// 1. Make Delete button work