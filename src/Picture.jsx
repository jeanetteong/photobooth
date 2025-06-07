import { useEffect, useRef } from 'react'

export default function Picture() {
    const videoRef = useRef(null)

    useEffect(() => {
        // Request access to webcam
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch((err) => {
                console.error('Error accessing webcam:', err)
            })
    }, [])

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    marginTop: '20px',
                }}
            />
        </div>
    )
}
