import React from "react";
import Text, { Font } from "@app/components/Text";

interface WhatWeDidProps {
  whatWeDid: string[];
}

const WhatWeDid = ({ whatWeDid }: WhatWeDidProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 border-b border-gray-100">
      <Text
        type={Font.GARAMOND}
        className="text-2xl font-bold mb-4 text-gray-800"
      >
        What We Did?
      </Text>
      
      <ul className="list-disc list-inside space-y-2 pl-4">
        {whatWeDid.map((item, index) => (
          <li key={index} className="text-lg">
            <Text type={Font.SOURCE_SANS} className="inline text-gray-700">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatWeDid;
