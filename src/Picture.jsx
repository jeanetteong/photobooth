import { useEffect, useRef, useState } from "react";

export default function Picture() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null)
    const [photoTaken, setPhotoTaken] = useState(false)

    useEffect(() => {
        //Request webcam access
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                alert('⚠️ Could not access the webcam. Please check your camera settings or permissions.')
                console.error('Webcam error:', err)
            });
    }, []);

    //Capture photo
    const capturePhoto = () => {
        const video = videoRef.current
        const canvas = canvasRef.current

        if (video && canvas) {
            const context = canvas.getContext('2d')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            setPhotoTaken(true)
        }
    }

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline className="webcam-video" />
            <button
                onClick={capturePhoto}
                className="capture-button"
            >
                Capture Photo
            </button>

            <canvas
                ref={canvasRef}
                className={`taken-picture ${photoTaken ? 'show' : 'hide'}`}
            />
        </div>
    );
}
