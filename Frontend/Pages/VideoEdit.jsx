import VideoPlayer from "../Components/VideoPlayer"
import Navbar from "../Components/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import adminCheck from "../Components/adminCheck"
import { useState } from "react"
import DropDown from "../Components/DropDown"
import { backendRequest } from "../Components/backendRequest"
import UploadWidget from "../Components/UploadWidget"


const VideoPlayPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state

    const [categories, setCategories] = useState([])
    const [isThumbUploaded, setIsThumbUploaded ] = useState(false)
    const [dataThumbLink, setDataThumbLink] = useState(data.thumbnail)
    const [dataCategory, setDataCategory] = useState("")
    const [count, setCount] = useState(0)
    const [admin, setAdmin] = useState(false)



    const [videoData, setVideoData] = useState({
        id: data.id,
        title: data.title,
        department: data.department,
        categoryId: data.category.id,
        categoryName: data.category.name,
        description: data.description,
        thumbnail: data.thumbnail
    })

    



    useEffect(() => {
        const isAdmin = async () => {
            const admin = await adminCheck()

            if(!admin)
                navigate('/login')
            
        }

        const getCat = async() => {
            const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/get`, "GET")
            setCategories(result.categories)
        }
        console.log(videoData)
        console.log(data.category.id)

        isAdmin()
        getCat()

    },[])

    useEffect(() => {
        setVideoData((prev) => ({
            ...prev,
            categoryId: dataCategory,
            }))
        }, [dataCategory]
    )


    useEffect(() => {
        setVideoData((prev) => ({
            ...prev,
            thumbnail: dataThumbLink,
            }))
        }, [dataThumbLink]
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData({
            ...videoData,
            [name]: value
        });
    }

    const handleClick = async() => {
        const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/video/edit`, "POST", videoData)
        alert(result.message)
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
                <div className="px-7">
                    <input onChange={handleChange} value={videoData?.title || ""} id="title" name="title" type="text" required placeholder="Video title"
                    className="mb-5 font-semibold mt-1 block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                    
                    <textarea onChange={handleChange} value={videoData?.description || ""} id="description" name="description" type="text" required placeholder="Video description"
                    className="mb-5 mt-1 block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                    
                    <input onChange={handleChange} value={videoData?.department || ""} id="department" name="department" type="text" required placeholder="Department"
                    className="mb-5 mt-1 block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            
                    <div className="flex justify-around">
                        <DropDown
                        dropdownButtonValue={videoData.categoryName}
                        dropdownValues={categories}
                        valueName="name"
                        keyName="id"
                        setMainValue={setDataCategory}
                        reRender = {count}
                    />

                    <UploadWidget
                        setLink={setDataThumbLink}
                        allowedFiles= 'image'
                        uploaded={isThumbUploaded}
                        setUploaded={setIsThumbUploaded}
                        text = "thumbnail"
                    />

                    <button onClick={handleClick}
                     className="px-5 py-2 bg-blue-500 text-white rounded-xl transition duration-150 hover:bg-blue-600">
                        Save
                    </button>
                    </div>
                </div>
                </div>
            </div></>
    )
}


export default VideoPlayPage