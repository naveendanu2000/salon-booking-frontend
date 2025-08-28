/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "../../smaller_components/Button";
import { useDispatch, useSelector } from "react-redux";
import addService from "../../../redux_logic/actionCreators/addService";
import getCategories from "../../../redux_logic/actionCreators/getCategories";
import { getSalonData } from "../../../redux_logic/actionCreators/getSalonData";
import { useNavigate } from "react-router-dom";

const AddServices = () => {
  const categoriesDataState = useSelector((state) => state.categoriesData);
  const salonDataState = useSelector((state) => state.salonData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    salonDataState.salonData ? dispatch(getSalonData()) : null;

    dispatch(getCategories(salonDataState.salonData.id));
  }, []);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Select Category");

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(
      addService({
        name,
        description,
        price: parseFloat(price),
        duration: parseInt(duration, 10),
        category: parseInt(category, 10),
        image,
      })
    );
    navigate("/admin/services");
  };
  return (
    <div>
      <h1 className="text-3xl mb-4 mx-20">Add Services</h1>
      <div>
        <div className="w-max m-auto">
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              handleForm(e);
            }}
          >
            <input
              className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
              type="text"
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            ></input>
            <input
              className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            ></input>
            <textarea
              className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200 resize-none"
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              cols="23"
              placeholder="Description"
            ></textarea>
            <input
              className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            ></input>
            <input
              className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
              type="text"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration"
            ></input>
            <select
              value={category}
              className="px-4 w-200 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoriesDataState.loading ? (
                <option></option>
              ) : (
                <>
                  <option value="">Select Category</option>
                  {categoriesDataState.categoriesData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            <Button name={"Add New Service"} bstyle={"text-green-500 border"}>
              <input type="submit"></input>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
