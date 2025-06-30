import VideoPlayer from "../Components/VideoPlayer"
import Navbar from "../Components/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import adminCheck from "../Components/adminCheck"
import { useState } from "react"
import { backendRequest } from "../Components/backendRequest"
import ConfirmationCard from "../Components/ConfirmationCard"


const VideoPlayPage = () => {

    const [showConfirmationCard, setShowConfirmationCard] = useState(false)
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state

    useEffect(() => {
        const isAdmin = async () => {
            const admin = await adminCheck()
            if(admin)
                setAdmin(true)
        }

        isAdmin()

    })



    const handleClick = async() => {
        navigate('/video/edit', {state: data})
    }

    const handleDeleteClick = () => {
        setShowConfirmationCard(true)
    }

    const handleDelete = async() => {
        const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/video/delete`, "POST", {id:data.id})
        if(!result.success)
            alert(result.message)
        alert("Video Deleted Successfully")
        navigate('/home')
    }

    return (
        <>
            <Navbar/>
            {showConfirmationCard &&
             <ConfirmationCard
                title="Permanently delete this video?"
                description="Are you sure you want to delete this video permanently?"
                setShowCard={setShowConfirmationCard}
                confirmationFunction={handleDelete}
            />}
            
            <div className=" mx-5 sm:p-6 p-2">
               <div className="max-w-5xl mx-auto bg-gray-50 shadow-2xl rounded-md pb-6">
                <div className="md:p-4">
                    <VideoPlayer
                        publicId={data.publicId}
                    />
                </div>
                <div className="flex justify-between justify-items-center">
                    <div className="m-4 md:mt-0 sm:font-bold font-semibold text-xl sm:text-2xl text-gray-700">
                    {data.title}
                </div>
                {admin && (
                <div 
                className="mr-5 mb-5 flex flex-col test-sm
                sm:flex-row sm:text-md"> 
                    <button onClick={handleClick}
                    className=" sm:mr-3 sm:px-3 sm:py-1
                    md:px-5 md:py-2 
                    mt-2 px-1 py-0.5
                     bg-blue-500 text-white rounded-xl transition duration-150 hover:bg-blue-600">
                        Edit
                    </button>
                    <button onClick={handleDeleteClick}
                     className="md:px-5 md:py-2
                     sm:px-3 sm:py-1
                      px-1 py-0.5 mt-2 bg-blue-500 text-white rounded-xl transition duration-150 hover:bg-blue-600">
                        Delete
                    </button>
                </div>
                )}
                </div>
                <div className="mx-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
                    <div className="text-gray-500 text-xs sm:text-sm">
                        {data.category?.name || "No category"} | {data.department} | {data.relativeTime}
                    </div>
                    <div className="text-xs sm:text-sm">
                        {data.description}
                    </div>
                </div>
            </div>
            </div></>
    )
}


export default VideoPlayPage