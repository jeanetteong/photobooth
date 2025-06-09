import { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";

export default function Save() {
  const location = useLocation();
  const { photos = [], selectedFrame } = location.state || {};
  const frameRef = useRef(null);

  const handleSave = async () => {
    if (!frameRef.current) return;

    try {
      const frameImg = frameRef.current.querySelector('.frame');
      if (!frameImg) return;

      // Wait for frame image to load if it hasn't already
      await new Promise((resolve) => {
        if (frameImg.complete) {
          resolve();
        } else {
          frameImg.onload = resolve;
        }
      });

      // Get the frame's natural dimensions
      const frameWidth = frameImg.naturalWidth;
      const frameHeight = frameImg.naturalHeight;

      // Configure html2canvas for maximum quality
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: null,
        scale: 3, // Higher scale for better resolution
        width: frameWidth,
        height: frameHeight,
        useCORS: true,
        allowTaint: true,
        logging: false,
        pixelRatio: window.devicePixelRatio || 1,
        removeContainer: true,
        imageTimeout: 15000, // Wait longer for images to load
        onclone: (clonedDoc) => {
          // Ensure the cloned frame container matches frame dimensions
          const clonedContainer = clonedDoc.querySelector('.frame-container');
          if (clonedContainer) {
            clonedContainer.style.width = frameWidth + 'px';
            clonedContainer.style.height = frameHeight + 'px';
            clonedContainer.style.overflow = 'visible';
            
            // Improve image quality in the clone
            const images = clonedContainer.querySelectorAll('img');
            images.forEach(img => {
              img.style.imageRendering = 'high-quality';
              img.style.imageRendering = '-webkit-optimize-contrast';
              img.style.imageRendering = 'crisp-edges';
            });
          }
        }
      });

      // Convert canvas to blob with maximum quality
      canvas.toBlob((blob) => {
        if (blob) {
          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `photostrip-${Date.now()}.png`;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up
          URL.revokeObjectURL(url);
        }
      }, "image/png", 1.0); // Maximum quality for PNG

    } catch (error) {
      console.error("Error saving photostrip:", error);
      alert("Failed to save photostrip. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="save-title">SAVE PHOTO STRIP</h1>
      
      <div className="frame-container" ref={frameRef}>
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

      <div className="save-controls">
        <button 
          onClick={handleSave}
          className="save-button"
          disabled={photos.length === 0}
        >
          Download Photostrip
        </button>
      </div>
    </div>
  );
}