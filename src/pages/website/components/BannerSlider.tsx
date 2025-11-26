import { useState, useEffect } from 'react';

const BannerSlider = () => {
  const banners = [
    { text: 'Banner 1: Welcome!', bg: 'bg-blue-500', img:'http://backend:3000/media/2508/1754890636533-bachpan coaching classes 1.jpg'},
    { text: 'Banner 2: Summer Sale', bg: 'bg-green-500', img:'http://backend:3000/media/2508/1754890641249-bachpan coaching classes 2.jpg' },
    { text: 'Banner 3: Free Shipping', bg: 'bg-red-500', img:'http://backend:3000/media/2508/1754890644699-bachpan coaching classes 3.jpg' },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 sec
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="relative w-full overflow-hidden shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div
            key={i}
            className={`w-full flex-shrink-0 text-white text-center text-2xl font-bold`}
          >
            <div><img className="w-full" src={banner.img}/></div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default BannerSlider;
