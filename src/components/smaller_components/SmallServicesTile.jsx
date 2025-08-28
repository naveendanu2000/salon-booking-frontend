import React from "react";
import Button from "./Button";

const SmallServicesTile = ({ data, handleButton }) => {
  return (
    <div className="flex flex-row my-5 mx-3 shadow p-3 w-100 rounded-md">
      <div className="grow h-25 w-20 flex justify-cetner items-center">
        <img src={data.image} className="w-40 rounded-md" alt="service_image"></img>
      </div>
      <div className="grow text-center w-50">
        <div>{data.name}</div>
        <div>Rs. {data.price}</div>
        <Button
          name={"Remove"}
          bstyle={
            "ring-1 ring-red-500 text-red-500 hover:text-white hover:bg-red-400 hover:shadow-md hover:ring-0 my-1"
          }
          handleClick={() => {
            handleButton(data.id);
          }}
        />
      </div>
    </div>
  );
};

export default SmallServicesTile;
