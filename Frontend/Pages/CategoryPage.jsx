import React, { useEffect, useState } from "react";
import Category from "../Components/Category";
import Navbar from "../Components/Navbar";
import { backendRequest } from "../Components/backendRequest";


const CategoryPage = () => {
    const [categories,setCategories] = useState([])
    const [rerender, setRerender] = useState(0)

    useEffect(() => {
            const isAdmin = async () => {
            const admin = await adminCheck()

            if(!admin)
                navigate('/login')
            
        }
        isAdmin()
    },[])

    useEffect(() => {
        const getCategories = async () => {
            const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/get`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                'content-type':'application/json'
                }
            })
            const result = await response.json()
            
            setCategories(result.categories)
        }

        getCategories()
    },[rerender,setRerender])


    // Add new category with empty input to fill
    const addNewCategory = async() => { 
        // await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/add` ,"POST", {id:Date.now(), category:""})
        setCategories((prev) => (
            [{
                id: Date.now(),
                name: ""
            },
            ...prev
            ]
        ))
    }
    return (
        <>
            <Navbar/>
            <div>
                <div className=" max-w-xl mx-auto flex flex-row-reverse">
                    <button className="px-4 py-2 mt-10 mb-3 bg-gray-50 inline-block" onClick={addNewCategory}>Add Category</button>
                </div>
                {categories.map((category) => {
                    return (
                        <div className="w-full">
                            <Category key={category.id} name={category.name} id={category.id} setRerender={setRerender} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export default CategoryPage


