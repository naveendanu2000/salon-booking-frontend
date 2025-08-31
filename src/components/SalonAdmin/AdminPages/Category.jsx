/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../smaller_components/Button";
import { useEffect, useState } from "react";
import CategoryTable from "../AdminComponents/CategoryTable";
import { getSalonData } from "../../../redux_logic/actionCreators/getSalonData";
import { useDispatch, useSelector } from "react-redux";
import getCategories from "../../../redux_logic/actionCreators/getCategories";
import createCategory from "../../../redux_logic/actionCreators/createCategory";

const Category = () => {
  const [allCategory, setAllCategory] = useState(true);
  const salonDataState = useSelector((state) => state.salonData);
  const dispatch = useDispatch();
  const categoriesDataState = useSelector((state) => state.categoriesData);

  const handleAllCategory = () => {
    setAllCategory(true);
  };

  const handleNewCategory = () => {
    setAllCategory(false);
  };

  useEffect(() => {
    if (!salonDataState.salonData?.id) {
      dispatch(getSalonData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (salonDataState.salonData?.id) {
      dispatch(getCategories(salonDataState.salonData.id));
    }
  }, [salonDataState.salonData?.id, dispatch]);

  const NewCategory = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const handleForm = (e) => {
      e.preventDefault();
      dispatch(createCategory({ name, image }));
      dispatch(getCategories(salonDataState.salonData.id));
      setAllCategory(true);
    };
    return (
      <div className="w-max m-auto">
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            handleForm(e);
          }}
        >
          <input
            type="text"
            className="px-4 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder="Image URL"
          ></input>
          <input
            className="px-4 py-3 mb-7 inset-shadow-sm inset-shadow-gray-200"
            type="text"
            placeholder="Name of the category"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <Button name={"Add Category"} bstyle={"text-green-500 border"}>
            <input type="submit"></input>
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-10">
        <Button
          name={"All Category"}
          bstyle={"bg-blue-500 mx-2"}
          handleClick={handleAllCategory}
        />
        <Button
          name={"Add Category"}
          bstyle={"bg-green-500 mx-2"}
          handleClick={handleNewCategory}
        />
      </div>
      <div className={""}>
        {allCategory ? (
          categoriesDataState.loading ? (
            <div className="h-80 flex justify-center items-center">
              <h1 className="text-2xl">Loading Data!</h1>
            </div>
          ) : (
            <CategoryTable data={categoriesDataState} />
          )
        ) : (
          <NewCategory />
        )}
      </div>
    </div>
  );
};

export default Category;
