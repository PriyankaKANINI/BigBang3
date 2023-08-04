import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const apiBaseUrl = "http://localhost:5234/api/TourImage";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(apiBaseUrl);
        console.log(response.data);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      {images.map((tourImage) => (
        <div key={tourImage.Id}>
          <h2>{tourImage.Name}</h2>
          {tourImage.ImagePath && (
            <img src={tourImage.ImagePath} alt={tourImage.Name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
