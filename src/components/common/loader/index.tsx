import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = ({ size = 50 }: { size?: number }) => {
  return (
    <div>
      <HashLoader
      className="w-full h-full flex justify-center items-center fixed inset-0"
      color="#0a418a"
      size={size}
      speedMultiplier={1}
    />
    </div>
  );
};

export default Loader;
