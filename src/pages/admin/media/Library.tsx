import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { uploadImage, mediaList } from '@/services/admin/media';

interface UploadedImage {
  name: string;
  url: string;
  created_at: string;
}

const MediaLibrary: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await mediaList();
      if (data.status) { console.log(data.data);
        setImages(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploads = Array.from(files).map(async (file) => {
      try {
        const uploaded = await uploadImage(file);
        await fetchImages();
        return uploaded;
      } catch (err) {
        console.error('Upload failed:', err);
        return null;
      }
    });

    await Promise.all(uploads);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Media Library</h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <label
            htmlFor="image-upload"
            className="block border-2 border-dashed border-gray-300 p-6 text-center rounded-xl cursor-pointer hover:bg-gray-50 transition"
          >
            <p className="text-gray-600">Click or drag & drop to upload images</p>
            <input
              id="image-upload"
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-400">No images found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 text-center text-sm text-gray-700 truncate">{image.name}</div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Image Details</h2>
              <img src={selectedImage.url} alt={selectedImage.name} className="w-full mb-4 rounded" />
              <p><strong>Name:</strong> {selectedImage.name}</p>
              <p><strong>URL:</strong> <a href={selectedImage.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{selectedImage.url}</a></p>
              <p><strong>Uploaded At:</strong> {new Date(Number(selectedImage.created_at)).toLocaleString()}</p>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
