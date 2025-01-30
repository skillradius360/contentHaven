import React from "react";

function Box({ coverImg, title, description }) {
  return (
    <div className="max-w-[14rem] h-80
   hover:border-[#D63484] border-solid border-4 duration-300 ease-in
      rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        {/* Responsive iframe */}
        <div className="aspect-w-16 aspect-h-9 rounded-xl ">
         <img src={coverImg} alt="lol" className= "w-max rounded-t-lg "/>
        </div>
      </a>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-1 text-base font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
          <span className="bg-blue-100 text-blue-800 text-[11px] font-medium mr-1 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            PG-13
          </span>
        </div>
        <p className="mt-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
          {description || "No Title"}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            ⭐ 8.4
          </span>
          <a
            href="#"
            className="inline-flex items-center px-2.5 py-1.5 text-[11px] font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch
            <svg
              className="w-3 h-3 ms-1 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Box;
