import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Frame() {
  const navigate = useNavigate();
  const location = useLocation();
  const photos = location.state?.photos || [];

  const frames = [
    "smiski_frame.png",
    "birthday_frame.png",
    "stardew_frame.png",
    "cat_frame.png",
    "dachshund_frame.png"
  ];
  const [frameIndex, setFrameIndex] = useState(0);

  const handlePrev = () => {
    setFrameIndex((prev) => (prev - 1 + frames.length) % frames.length);
  };
  const handleNext = () => {
    setFrameIndex((prev) => (prev + 1) % frames.length);
  };

  return (
    <div>
      <h1 className="frame-title">CHOOSE A FRAME</h1>
      <div className="frame-container">
        <button className="arrow left-arrow" onClick={handlePrev}>
          &#10094;
        </button>
        <img
          className="frame"
          src={`/src/assets/images/${frames[frameIndex]}`}
          alt="Photo Frame"
        />

        <div className="photostrip">
          {photos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Frame ${index + 1}`}
              className="frame-photo"
            />
          ))}
        </div>

        <button className="arrow right-arrow" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      <button
        className="confirm-button"
        onClick={() =>
          navigate("/save", {
            state: { photos, selectedFrame: frames[frameIndex] },
          })
        }
      >
        CONFIRM
      </button>
    </div>
  );
}
