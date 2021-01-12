import { useEffect, useState } from "react";

const Overlay = ({ children, isOpen, onClose, grid }) => {
  return (
    <div
      className={`z-50 flex flex-col justify-center items-center w-full h-screen fixed top-0 bg-black bg-opacity-50 ${
        !isOpen && "hidden"
      }`}
      onClick={onClose}
    >
    <button onClick={onClose} className="bg-red-500 p-2 absolute top-0 right-0">Close</button>
      <div className="w-4/6 bg-white overflow-scroll">
        {grid && (
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 mb-36 px-3">
            {children.map((item) => {
              return (
                <div className="flex flex-col">
                  <img className="h-24" src={item.image_url} alt="" />
                  <p className="font-bold">{item.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overlay;
