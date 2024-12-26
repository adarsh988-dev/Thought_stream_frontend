import React, { useState } from 'react';
import Card from './CardComponent';
import { Link } from 'react-router-dom';

const Home = () => {
  const [images, setImages] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      setImages((prevImages) => [...prevImages, selectedImage]); 
      setSelectedImage(null);      
    }
    document.getElementById("myfile").value = "";
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="text-center text-4xl pt-10 pb-6">
        Welcome to Thought Stream
      </div>
      <div className="flex flex-col items-center">
        <input
          type="file"
          id="myfile"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        {selectedImage && (
          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Upload
        </button>
      </div>
      <div className="mt-8 px-4">
        <h2 className="text-center text-2xl mb-6">Uploaded Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <Link to={`/commentpage/${index + 1}`} >
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-lg shadow-lg"
                />
             </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
