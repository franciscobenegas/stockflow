import React from "react";

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className=" text-2xl md:text-5xl mr-5 md:mr-10 text-sky-800">
        Cargando
      </p>
      <div className="relative">
        <div className="md:h-24 md:w-24 h-10 w-10 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 md:h-24 md:w-24  h-10 w-10 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
    </div>
  );
};
