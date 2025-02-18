import React, { useState } from 'react'

const ImageSlide = (props) => {
    const {imageUrls} = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle previous button click
  const handlePrevious = () => {
    setCurrentIndex((index) =>
      index === 0 ? imageUrls.length - 1 : index - 1
    );
  };

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex((index) =>
      index === imageUrls.length - 1 ? 0 : index + 1
    );
  };

    return (
        <div className='rounded-md flex flex-col justify-center w-full'>
            <img 
                src={imageUrls[currentIndex]} 
                alt={`Product ${currentIndex + 1}`}
                className="object-fit rounded-md border-2 border-slate-600 w-full lg:w-4/5"
            />
            <div className='text-slate-600  flex flex-row text-2xl lg:text-5xl font-[NeueBit]'>
                <button className='border-2 border-slate-600 px-4 m-2 bg-white' onClick={handlePrevious}>{"<"}</button>
                <button className='border-2 border-slate-600 px-4 m-2 bg-white' onClick={handleNext}>{">"}</button>
            </div>
        </div>
    )
}

export default ImageSlide;