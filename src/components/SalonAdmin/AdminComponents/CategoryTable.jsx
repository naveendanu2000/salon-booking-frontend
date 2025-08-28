import { useState, useEffect } from "react";
import Button from "../../smaller_components/Button";
import deleteCategory from "../../../redux_logic/actionCreators/deleteCategory";
import { useDispatch } from "react-redux";
import getCategories from "../../../redux_logic/actionCreators/getCategories";

const CategoryTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPages(Math.floor(data.categoriesData.length / 10) + 1);
    if (data?.categoriesData?.length < 10) setEnd(data?.categoriesData?.length);
  }, [data.categoriesData]);

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
    dispatch(getCategories());
  };

  const handleUpdatePage = (page) => {
    setCurrentPage(page);
    const newStart = (page - 1) * 10;
    const newEnd = Math.min(newStart + 10, data.categoriesData.length);
    setStart(newStart);
    setEnd(newEnd);
  };

  return (
    <div className="px-10">
      <div className="flex justify-center">
        <table className="w-[100%] shadow-xl overflow-hidden rounded-md">
          <thead className="bg-green-500">
            <tr>
              <th className="w-120">Image</th>
              <th>Title</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.loading ? (
              <div className="h-40 flex justify-center items-center">
                <h1 className="text-2xl">Loading Data!</h1>
              </div>
            ) : (
              data.categoriesData.slice(start - 1, end).map((item) => (
                <tr key={item.id} className="p-5">
                  <td className="flex justify-center">
                    <img
                      className="h-15 w-20 m-3"
                      src={item.image}
                      alt="category image"
                    ></img>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      name={"Delete"}
                      bstyle={`shadow bg-red-500 hover:bg-red-300 hover:shadow-md`}
                      handleClick={() => {
                        handleDeleteCategory(item.id);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="max-w-3xl rounded flex justify-center mx-auto mt-10">
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

export default CategoryTable;
