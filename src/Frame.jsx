import { useLocation } from "react-router-dom";

export default function Frame() {
  const location = useLocation();
  const photos = location.state?.photos || [];

  return (
    <div>
      <h1 className="frame-title">CHOOSE A FRAME</h1>
      <div className="frame-container">
        <img className="frame" src="./src/assets/images/smiski_frame.png" alt="Smiski Frame"/>
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
      </div>
    </div>
  );
}
