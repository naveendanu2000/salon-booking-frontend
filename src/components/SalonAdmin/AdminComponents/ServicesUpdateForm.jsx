import React, { useState } from "react";

const ServicesUpdateForm = ({ handleForm, categoriesDataState, data, id }) => {
  const [image, setImage] = useState(data.image);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const [duration, setDuration] = useState(data.duration);
  const [category, setCategory] = useState(data.categoryId);

  return (
    <form
      id="updateForm"
      className="flex flex-col m-5"
      onSubmit={(e) => {
        handleForm(
          e,
          { name, image, description, price, duration, category },
          id
        );
      }}
    >
      <input
        className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder={data.image}
      ></input>
      <input
        className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={data.name}
      ></input>
      <textarea
        className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="5"
        cols="23"
        placeholder={data.description}
      ></textarea>
      <input
        className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder={data.price}
      ></input>
      <input
        className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder={data.duration}
      ></input>
      <select
        className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
        onChange={(e) => setCategory(e.target.value)}
      >
        {categoriesDataState.loading ? (
          <option>Loading!</option>
        ) : (
          <>
            <option value="">Select Category</option>
            {categoriesDataState.categoriesData.map((i) => (
              <option
                selected={data.categoryId === parseInt(i.id)}
                key={i.id}
                value={i.id}
              >
                {i.name}
              </option>
            ))}
          </>
        )}
      </select>
    </form>
  );
};

export default ServicesUpdateForm;
