import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authCheck from "../Components/authCheck.js"; 
import Navbar from "../Components/Navbar.jsx";
import DropDown from "../Components/DropDown.jsx";
import { backendRequest } from "../Components/backendRequest.js";
import UploadWidget from "../Components/UploadWidget.jsx";



const VideoUpload = () => {

    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
    const [dataCategory, setDataCategory] = useState("")  // Temporary category used for communicating with dropdown takes Id
    const [dataVideoLink, setDataVideoLink] = useState("")
    const [dataThumbLink, setDataThumbLink] = useState("")
    const [dataPublicId, setDataPubicId] = useState("")
    const [isVidUploaded, setIsVidUploaded ] = useState(false)
    const [isThumbUploaded, setIsThumbUploaded ] = useState(false)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    useEffect(() => {     
        const auth = async () => {
            try {
                const data = await authCheck()

                if(!data.isAdmin || !data.success)
                    navigate('/login')

                const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/get`, "GET")
                setCategories(result.categories)

            } catch (error) {
                console.error("Error fetching visitor data:", error);
                navigate("/login");
            }
        }

        

        auth()

    }, [navigate]);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            categoryId: dataCategory,
            url: dataVideoLink,
            thumbnail: dataThumbLink,
            publicId: dataPublicId
            }))
        }, [dataCategory, dataVideoLink, dataThumbLink]
    )




    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        if(!data.title || !data.description || !data.categoryId || !data.department || !data.url || data.categoryId === "Select")
            return alert("All fields are required")
        
        const email = localStorage.getItem("email")
        if(!email) alert("Email Missing Please Relogin and try again")
        const dataSent = {
            ...data,
            userEmail: email
        }

        const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/video/upload`, "POST", dataSent)
        if(result.success)
        {
            setData({})
            setIsThumbUploaded(false)
            setIsVidUploaded(false)
            setCount(count + 1)
            alert("Video Uploaded Successfully")
        }
        else
            alert("Upload Failed", result.message)

    }

    return (
        <>
            <Navbar/>
            <section>
                <div className="max-w-2xl mx-auto mb-10 p-8 py-12 bg-white rounded-xl shadow-lg  mt-5">
                    <h1 className="text-2xl font-bold text-center">Video Upload</h1>
                    <div className="mt-8">
                        <div className="mt-6">
                        <form className="space-y-7">

                            <div>
                            <label htmlFor="title"  className="block text-sm font-medium text-gray-600"> Title </label>
                                <input value={data?.title || ""} onChange={handleChange} id="title" name="title" type="text" required placeholder="Video title"
                                className="mt-1 block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            </div>

                            <div>
                            <label htmlFor="description"  className="block text-sm font-medium text-gray-600"> Description </label>
                                <textarea value={data?.description || ""} onChange={handleChange} id="description" name="description" type="text" required placeholder="Video description"
                                className="mt-1 block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            </div>

                            <div>
                            <label htmlFor="department"  className="block text-sm font-medium text-gray-600"> Department </label>
                                <input value={data?.department || ""} onChange={handleChange} id="department" name="department" type="text" required placeholder="Department"
                                className="mt-1 block w-full px-5 py-2 text-base text-gray-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-gray-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                            </div>

                            <div className="sm:flex justify-between">
                                <div>
                                <label  className="block text-sm font-medium text-gray-600 mb-1"> Category </label>
                                    <div className="">
                                        <DropDown
                                        dropdownButtonValue="Select"
                                        dropdownValues={categories}
                                        valueName="name"
                                        keyName="id"
                                        setMainValue={setDataCategory}
                                        reRender = {count}
                                    />
                                    </div>
                                </div>

                                <div>
                                    <label  className="block text-sm font-medium text-gray-600 mb-1"> Upload Video </label>
                                    <UploadWidget 
                                        setLink={setDataVideoLink}
                                        setId = {setDataPubicId}
                                        allowedFiles='video'
                                        uploaded={isVidUploaded}
                                        setUploaded={setIsVidUploaded}
                                    />
                                </div>

                                <div>
                                    <label  className="block text-sm font-medium text-gray-600 mb-1"> Upload Thumbnail </label>
                                    <UploadWidget
                                        setLink={setDataThumbLink}
                                        setId = {setDataPubicId}
                                        allowedFiles= 'image'
                                        uploaded={isThumbUploaded}
                                        setUploaded={setIsThumbUploaded}
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                            <button type="submit" onClick={handleSubmit}
                                className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200">Upload</button>
                            </div>
                        </form>                     
                       
                        </div>
                    </div>
                    </div>
            </section>
        </>
    )
}


export default VideoUpload