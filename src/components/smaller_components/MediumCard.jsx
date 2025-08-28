import React from "react";

const MediumCard = ({ heading, imgSrc, onClick }) => {
  return (
    <div className="m-10 w-[25rem] transition-transform duration-300 hover:scale-105 p-4 inline-block shadow-lg bg-white" onClick={onClick}>
      <div className="p-2">
        <img src={imgSrc} />
      </div>
      <div className="p-2">
        <h3 className="text-xl">{heading}</h3>
      </div>
    </div>
  );
};

export default MediumCard;
