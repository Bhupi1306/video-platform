const VideoCard = ({title, imgSrc, time, category}) => {
    return (
        <>
        <div
         className="max-w-sm h-75 mb-5 rounded-xl border-2 border-gray-100 hover:bg-neutral-50  transition duration-400 hover:shadow-md">
            <div className="overflow-hidden h-47 rounded-md mt-4 mx-4" >
                <div className="w-full"> 
                <img src={imgSrc} alt="img" className="" />
                </div>
            </div>
            <div className="m-4 mb-1 font-semibold text-lg text-gray-600 leading-5">
                {title}
            </div>
            <div className="mx-4 text-sm font-medium  text-gray-400 flex flex-row-reverse">
                {time} | {category}
            </div>
        </div>
        </>
    )
}


export default VideoCard