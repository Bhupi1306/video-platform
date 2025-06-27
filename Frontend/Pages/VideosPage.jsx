import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import VideoCard from "../Components/VideoCard"
import {backendRequest} from "../Components/backendRequest.js"
import logo from "../src/assets/logo.jpg"
import { useNavigate } from "react-router-dom"
export default function VideosPage() {

  const [videos, setVideos] = useState([])
  const navigate = useNavigate()

  
  const handleClick = (data) => {
      navigate(`play`, {state: data})
  }

  useEffect(() => {
    const loadVideos = async() => {
      const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/video/get`,"GET")
      setVideos(result.videos)
    }

    loadVideos()
    
  },[])

    return(
      <>
        <div className="relative">
          <Navbar/>
          

          <div className="flex justify-around flex-wrap max-w-300 mx-auto pt-20 pb-10 ">
            {videos.map((video) =>(
              <span key={video.id} onClick={()=>{handleClick(video)}}>
                <VideoCard
                  title={video.title}
                  imgSrc={video.thumbnail || logo }
                  time={video.relativeTime}
                  category={video.category.name}
                />
              </span>
            ))}

          </div>

        </div>
      </>
    )
}
