/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Button from "../../smaller_components/Button";
import { useDispatch, useSelector } from "react-redux";
import getCategories from "../../../redux_logic/actionCreators/getCategories";
import { getSalonData } from "../../../redux_logic/actionCreators/getSalonData";
import updateService from "../../../redux_logic/actionCreators/updateService";
import ServicesUpdateForm from "./ServicesUpdateForm";

const ServicesTable = ({ data }) => {
  const categoriesDataState = useSelector((state) => state.categoriesData);
  const salonDataState = useSelector((state) => state.salonData);
  const dispatch = useDispatch();

  useEffect(() => {
    salonDataState.salonData ? dispatch(getSalonData()) : null;

    dispatch(getCategories(salonDataState.salonData.id));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);
  const [update, setUpdate] = useState(false);

  const handleForm = (e, data, id) => {
    e.preventDefault();
    dispatch(
      updateService(id, {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        duration: parseInt(data.duration, 10),
        category: parseInt(data.category, 10),
        image: data.image,
      })
    );
    setUpdate(false);
  };

  useEffect(() => {
    setTotalPages(Math.floor(data.servicesData.length / 10) + 1);
    if (data.servicesData.length < 10) setEnd(data.servicesData.length);
  }, [data.servicesData]);

  const handleUpdatePage = (page) => {
    setCurrentPage(page);
    const newStart = (page - 1) * 10;
    const newEnd = Math.min(newStart + 10, data.servicesData.length);
    setStart(newStart);
    setEnd(newEnd);
  };
  return (
    <div className="px-10">
      <div className="flex justify-center">
        <table className="w-[100%] shadow-xl overflow-hidden rounded-md">
          <thead className="bg-green-500 shadow">
            <tr>
              <th className="w-120">Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.servicesData.slice(start, end).map((item) => (
              <tr key={item.id}>
                {update === item.id ? (
                  <td colSpan={`3`}>
                    <div className="flex justify-center">
                      {
                        <ServicesUpdateForm
                          id={item.id}
                          handleForm={handleForm}
                          categoriesDataState={categoriesDataState}
                          data={item}
                        />
                      }
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="flex justify-center">
                      <img
                        className="h-15 w-20 m-3"
                        src={item.image}
                        alt="category image"
                      ></img>
                    </td>
                    <td>{item.name}</td>
                    <td>Rs. {item.price}</td>
                  </>
                )}
                <td>
                  <Button
                    name={"Update"}
                    bstyle={`shadow bg-red-500 hover:bg-red-300 hover:shadow-md ${
                      update ? "hidden" : ""
                    }`}
                    handleClick={() => {
                      setUpdate(item.id);
                    }}
                  />
                  <Button
                    name={"Confirm"}
                    bstyle={`shadow bg-red-500 hover:bg-red-300 hover:shadow-md ${
                      !update ? "hidden" : ""
                    }`}
                    type={"submit"}
                    form="updateForm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-3xl rounded flex justify-center m-auto  mt-10">
        <button
          className="px-4 bg-green-600 cursor-pointer disabled:bg-green-200 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => {
            handleUpdatePage(currentPage - 1);
          }}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i + 1}
            className={`${
              i + 1 === currentPage ? "bg-gray-300" : null
            } cursor-pointer w-10 max-h-10 h-10 flex items-center justify-center  text-center`}
            onClick={() => {
              handleUpdatePage(i + 1);
            }}
          >
            {i + 1}
          </div>
        ))}
        <button
          className="px-4 bg-green-600 cursor-pointer disabled:bg-green-200 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => {
            handleUpdatePage(currentPage + 1);
          }}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ServicesTable;
