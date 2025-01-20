import { FiDelete } from "react-icons/fi";
import { useEffect } from "react";

export const ImageUploadField = (props) => {
  const {previewUrls,imgRemoveHandler} = props; 

  return (
    <div className="w-full flex flex-col items-center justify-center md:flex-row gap-2 h-screen md:h-48">
      {previewUrls.map((previewUrl, index) => (
        <div
          key={index}
          className="relative w-full h-full border-2 border-dashed border-blue-500 rounded-md p-5 flex items-center justify-center overflow-hidden"
        >
          {typeof previewUrl === 'string' ? (
            <img
              className="object-cover w-full h-full"
              src={previewUrl}
              alt={`Preview ${index}`}
            />
          ) : previewUrl?.url ? (
            <img
              className="object-cover w-full h-full"
              src={previewUrl.url}
              alt={`Preview ${index}`}
            />
          ) : (
            <span className="text-blue-500 text-2xl">+</span>
          )}
          <FiDelete className="size-5 absolute top-0 right-0 stroke-blue-500 m-1 hover:cursor-pointer" onClick={()=> imgRemoveHandler(index)}/>
        </div>     
      ))}
        {previewUrls.length < 3 &&
        Array.from({ length: 3 - previewUrls.length }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="w-2/3 md:w-full h-48 sm:w-2/3 border-2 border-dashed border-blue-500 rounded-md p-5 flex flex-row md:flex-col items-center justify-center"
          >
            <span className="text-blue-500 text-2xl">+</span>
          </div>
        ))}
    </div>
  );
};
