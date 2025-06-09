import { useLocation } from "react-router-dom";

export default function Save() {
  const location = useLocation();
  const { photos = [], selectedFrame } = location.state || {};

  return (
    <div>
      <h1 className="save-title">SAVE PHOTO STRIP</h1>
      <div className="frame-container">
        <img
          className="frame"
          src={`./src/assets/images/${selectedFrame}`}
          alt="Selected Frame"
        />

        <div className="photostrip">
          {photos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Saved Photo ${index + 1}`}
              className="frame-photo"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
