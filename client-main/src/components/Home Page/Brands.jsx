import React, { useState, useEffect } from 'react';

export default function Brands() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://onrtech.fr/images/caisse_des_depots.png",
    "https://onrtech.fr/images/welldom.png",
    "https://onrtech.fr/images/leroy_merlin.png",
    "https://onrtech.fr/images/bnp_paribas.png",
    "https://onrtech.fr/images/darty.png",
    "https://onrtech.fr/images/ncr.png",
    "https://onrtech.fr/images/bureau_veritas_group.png",
    "https://onrtech.fr/images/Metrixware_systemobjects.png",
    "https://onrtech.fr/images/habitat_formation.png",
    "https://onrtech.fr/images/AG2R-LA-MONDIALE.png",
    "https://onrtech.fr/images/sagemcom.png",
    "https://onrtech.fr/images/LCL.png",
    "https://onrtech.fr/images/thales.png",
    "https://onrtech.fr/images/Microsoft.png",
    "https://onrtech.fr/images/qorvo.png",
    "https://onrtech.fr/images/ratp.png",
    "https://onrtech.fr/images/Telefonica.png",
    "https://onrtech.fr/images/solocal.png",
    "https://onrtech.fr/images/xlairways.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 1)); // Adjust to avoid overflow
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length - 1)) % (images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 1));
  };

  return (
    <div className="bg-white dark:bg-[#1f2937] ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 dark:text-white ">
          <p>Our Clients</p>
        </blockquote>
        <h2 className="text-center font-semibold leading-8 text-gray-900 dark:text-white">
          “We Don't Just Build Softwares, We Build Your Business.”
        </h2>
        <div className="relative mt-10 overflow-hidden max-w-lg mx-auto sm:max-w-xl lg:max-w-none">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div className="flex-shrink-0 w-full sm:w-1/3 " key={index}>
                <img
                  className="max-h-16 w-full object-contain "
                  src={src}
                  alt={`Logo ${index}`}
                  width={158}
                  height={48}
                />
              </div>
            ))}
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-200 text-gray-800 rounded-full focus:outline-none"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-200 text-gray-800 rounded-full focus:outline-none"
            aria-label="Next"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
