import { useEffect, useRef, useState } from "react";

export default function Picture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

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
        alert(
          "⚠️ Could not access the webcam. Please check your camera settings or permissions."
        );
        console.error("Webcam error:", err);
      });
  }, []);

  //5 sec countdown
  const startCountdown = () => {
    setIsHidden(true);

    let photoCount = 0;

    const takeNextPhoto = () => {
      if (photoCount >= 4) return;

      let seconds = 5;
      setCountdown(seconds);

      const interval = setInterval(() => {
        seconds -= 1;
        setCountdown(seconds);

        if (seconds === 0) {
          clearInterval(interval);
          capturePhoto();
          photoCount++;

          if (photoCount < 4) {
            setTimeout(takeNextPhoto, 1000);
          } else {
            setCountdown(0);
          }
        }
      }, 1000);
    };

    takeNextPhoto();
  };

  //Capture photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");
      setPhotos((prev) => [...prev, dataURL]);
      setPhotoTaken(true);
    }
  };

  return (
    <div>
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="webcam-video" />

        {countdown > 0 && (
          <div className="countdown-overlay">
            <span>{countdown}</span>
          </div>
        )}
      </div>
      {!isHidden && (
        <button onClick={startCountdown} className="capture-button">
          CAPTURE PHOTO
        </button>
      )}

      <canvas ref={canvasRef} className="hide" />

      {photos.length > 0 && (
        <div className="photo-gallery">
          {photos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Capture ${index + 1}`}
              className="photo-thumbnail"
            />
          ))}
        </div>
      )}
    </div>
  );
}
