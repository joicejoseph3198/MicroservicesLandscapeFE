export const ImageUploadField = (props) => {
    const {previewUrls} = props; 
  return (
    <div className="w-full flex flex-row gap-2 h-48">
      <div className="w-1/3 border-2 border-dashed border-blue-500 rounded-md p-5">
        {previewUrls[0] && (
          <img className="object-contain h-full" src={previewUrls[0].url} />
        )}
      </div>
      <div className="w-1/3 border-2 border-dashed border-blue-500 rounded-md p-5">
        {previewUrls[1] && (
          <img className="object-scale-down h-full" src={previewUrls[1].url} />
        )}
      </div>
      <div className="w-1/3 border-2 border-dashed border-blue-500 rounded-md p-5 static">
        {previewUrls[2] && (
          <img className="object-contain h-full" src={previewUrls[2].url}/>
        )}
      </div>
    </div>
  );
};
