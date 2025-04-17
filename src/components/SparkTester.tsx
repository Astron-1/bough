import React from 'react';
import ClickSpark from './ClickSpark';

const SparkTester = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9000 }}>
      <ClickSpark 
        sparkColor="red" 
        sparkRadius={50} 
        sparkCount={12} 
        sparkSize={15}
        duration={800}
      >
        <div className="p-8 bg-blue-500 text-white rounded-lg cursor-pointer">
          Click me to see sparks!
        </div>
      </ClickSpark>
    </div>
  );
};

export default SparkTester; 