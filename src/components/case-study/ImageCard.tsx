import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface ImagesCardProps {
  imageData: {
    heading?: string;
    description?: string;
    src: string | StaticImageData;
  };
}

const ImageCard = ({ imageData }: ImagesCardProps) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center min-w-1/2">
      <Image
        src={imageData.src}
        alt={imageData.heading || "Image"}
        className="rounded-lg object-cover"
        width={500}
        // height={400}
      />
      <h4 className="text-lg font-semibold mt-8 text-gray-800">
        {imageData.heading}
      </h4>
      {imageData.description && (
        <p className="text-gray-600 mt-2">{imageData.description}</p>
      )}
    </div>
  );
};

export default ImageCard;
