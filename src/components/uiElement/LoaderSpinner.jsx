import React from "react";

const LoaderSpinner = () => {
  return (
    <>
    <div className="flex justify-center items-center h-full">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gradient-to-r from-[#0B1C2D] to-[#0E5FD8] mt-55"></div>
    </div>
    </>
  );
};

export default LoaderSpinner;
