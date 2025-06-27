import VideoPlayer from "../Components/VideoPlayer"
import Navbar from "../Components/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import adminCheck from "../Components/adminCheck"
import { useState } from "react"


const VideoPlayPage = () => {
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

    return (
        <>
            <Navbar/>
            <div className=" mx-5 p-6">
               <div className="max-w-5xl mx-auto bg-gray-50 shadow-2xl rounded-md pb-6">
                <div className="md:p-4">
                    <VideoPlayer
                        publicId={data.publicId}
                    />
                </div>
                <div className="flex justify-between justify-items-center">
                    <div className="m-4 md:mt-0 font-bold text-2xl text-gray-700">
                    {data.title}
                </div>
                {admin && (
                <div className="mr-5"> 
                    <button onClick={handleClick}
                     className="px-5 py-2 bg-blue-500 text-white rounded-xl transition duration-150 hover:bg-blue-600">Edit</button>
                </div>
                )}
                </div>
                <div className="mx-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
                    <div className="text-gray-500 text-sm">
                        {data.category.name} | {data.department} | {data.relativeTime}
                    </div>
                    <div>
                        {data.description}
                    </div>
                </div>
            </div>
            </div></>
    )
}


export default VideoPlayPage