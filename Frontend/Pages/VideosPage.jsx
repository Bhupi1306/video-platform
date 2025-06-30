import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import VideoCard from "../Components/VideoCard"
import {backendRequest} from "../Components/backendRequest.js"
import logo from "../src/assets/logo.jpg"
import { useNavigate } from "react-router-dom"
import DropDown from "../Components/DropDown"
import Pagination from "../Components/Pagination.jsx"
import Search from "../Components/Search.jsx"

export default function VideosPage() {

  const [videos, setVideos] = useState([])
  const [allVideos,setAllVideos] = useState([])
  const [count, setCount] = useState(0)
  const [categories, setCategories] = useState([])
  const [category,setCategory] = useState("")
  const [totalPage, setTotalPage] = useState()



  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 9;


  const [searchValue, setSearchValue] = useState("")

  const navigate = useNavigate()


  
  const handleClick = (data) => {
      navigate(`play`, {state: data})
  }

  useEffect(() => {
    const loadVideos = async() => {
      const result = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/video/get`,"GET")
      setVideos(result.videos)
      setAllVideos(result.videos)
      const catResult = await backendRequest(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/get`, "GET")
      setCategories(catResult.categories)
    }

    loadVideos()   
  },[])

  useEffect(() => {
    if(!category) 
       setVideos(allVideos)

    else{
      const shownVideos = allVideos.filter((video) => video.category.id === category)
      setVideos(shownVideos)
    }
  },[category])

  const paginatedVideos = videos.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage)
  useEffect(() => {
     setTotalPage(Math.ceil(videos.length / itemsPerPage)) 
  })


  


    return(
      <>
        <div className="relative">
          <Navbar/>
            
          {videos.length && <div className="flex-row-reverse justify-center flex max-w-5xl mx-auto gap-x-2 sm:gap-x-10 mt-2 md:my-10">
            <div className="mr-5 mt-1">
              <DropDown
                dropdownButtonValue="Category"
                dropdownValues={categories}
                valueName="name"
                keyName="id"
                setMainValue={setCategory}
                reRender = {count} 
                showAdd={true}
                />
            </div>

             <div className="w-full max-w-md">
                <Search
                  value={searchValue}
                  setValue={setSearchValue}
                />
            </div>   
              
          </div>}
          <div className="flex justify-around flex-wrap max-w-300 mx-auto pt-5 pb-10 px-5 gap-x-1 md:mt-10 ">
            {paginatedVideos.filter(item => {
              return searchValue.toLowerCase() === '' ? item : item.title?.toString().toLowerCase().includes(searchValue.toString().toLowerCase())
            }).map((video) =>(
              <span key={video.id} onClick={()=>{handleClick(video)}}>
                <VideoCard
                  title={video.title}
                  imgSrc={video.thumbnail || logo }
                  time={video.relativeTime}
                  category={video.category?.name || "No category"}
                />
              </span>
            ))}

          </div>

        </div>

        <div className="mb-10">
          {totalPage > 1 && 
            (
              <Pagination
                page= {currentPage}
                setCurrentPage = {setCurrentPage}
                totalPage = {totalPage}
              />
            )
          }
        </div>
      </>
    )
}
