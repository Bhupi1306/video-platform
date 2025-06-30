import cloudinary from "cloudinary-video-player"
import "cloudinary-video-player/cld-video-player.min.css";
import { useEffect, useRef } from "react";




const VideoPlayer = ({publicId}) => {
  const cloudinaryRef = useRef();
  const playerRef = useRef();

    useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    const player = cloudinaryRef.current.videoPlayer(playerRef.current, {
      cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      controls: true,
      playbackRates: [0.5, 1, 1.5, 2]
    });
    player.source(publicId)
  }, []);
  

    return (
    <div className="auto">
      <video
      ref={playerRef}
      className="cld-video-player cld-fluid aspect-video"
    />
    </div>
  );
};


export default VideoPlayer