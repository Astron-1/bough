import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { Font } from "../Text";
import Text from "../Text";

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
      <Text
        type={Font.GARAMOND}
        className="text-lg font-semibold mt-8 text-gray-800"
      >
        {imageData.heading}
      </Text>
      {imageData.description && (
        <Text type={Font.SOURCE_SANS} className="text-gray-600 mt-2">
          {imageData.description}
        </Text>
      )}
    </div>
  );
};

export default ImageCard;
