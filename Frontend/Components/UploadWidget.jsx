import { useState } from "react";
import { useEffect } from "react"
import { useRef } from "react"


const UploadWidget = ({setLink, setId = () => {}, allowedFiles, uploaded, setUploaded, text = "Upload file"}) => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef();
    const [isUploaded, setIsUploaded] = useState(uploaded)
    const [info, setInfo] = useState()


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset: 'vid-up',
            sources: ['local','url','camera','google_drive'],
            multiple: false,
            folder: 'Nirmaan',
            clientAllowedFormats: allowedFiles,
            showUploadMoreButton: false
        }, function(error, result) {
            if(!error && result && result.event === "success")
            {
                setIsUploaded(true)
                setUploaded(true)
                setInfo(result.info)
                if(allowedFiles === 'video')
                    setId(result.info.public_id)

                setLink(result.info.secure_url)
            }
            // Handle the result or error here
        });
    },[])

    useEffect(() => {
        setIsUploaded(uploaded)
    },[uploaded])




    return (
        <>
        {/* <button onClick={()=> {widgetRef.current.open()}}>Working</button> */}
        <div className={`${isUploaded ? "hidden" : ""}`}>
            <span
                className={`inline-flex justify-center divide-gray-300 overflow-hidden rounded-md px-2 border border-gray-300 bg-gray-50 shadow-sm min-w-25 hover:bg-gray-50 hover:text-gray-900`}
                onClick={() => {widgetRef.current.open()}}
            >
                <button
                type="button"
                className="py-2 px-2 text-sm font-medium text-gray-700 transition-colors focus:relative"
                
                >
                {text}
                </button>
            </span>
        </div>

        <div className={`${isUploaded ? "" : "hidden"}`}> 
            <span
                className={`inline-flex justify-center divide-gray-300 overflow-hidden rounded-md px-2 border border-gray-300 bg-gray-50 shadow-sm min-w-25 hover:bg-gray-50 hover:text-gray-900`}
            >
                <button
                type="button"
                className="py-2 px-2 text-sm font-medium text-gray-700 transition-colors focus:relative"
                
                >
                Uploaded
                </button>
            </span>
        </div>
        </>
    )
}


export default UploadWidget