import React from "react";

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-5xl mr-10 text-sky-800">Cargando</p>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
      </div>
    </div>
  );
};
