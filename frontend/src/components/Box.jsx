import React from "react";

function Box({ coverImg, title, releaseDate,type,timeframe,quality }) {
  return (
    <div className="w-54 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={coverImg} 
          alt="Moana 2"
          className="w-full h-60 object-cover"
        />
        <span className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-1 py-0.5 rounded">
          {quality}
        </span>
      </div>
      <div className="p-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-500">{releaseDate} {timeframe}</p>
        <span className="mt-1 inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-md">
          {type}
        </span>
      </div>
    </div>
  );
}

export default Box;
