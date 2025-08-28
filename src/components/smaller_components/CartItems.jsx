import { useDispatch } from "react-redux";
import Button from "./Button";
import { removeServicesCartAction } from "../../redux_logic/actionCreators/servicesCartAction";

const CartItems = ({ data }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeServicesCartAction(data.id));
  };
  return (
    <div className="flex flex-row shadow-md rounded-md m-10 max-h-50 p-7 w-150">
      <div className="me-10">
        <img src={data.image} className="max-w-50 rounded-md"></img>
      </div>
      <div className="border-l-1 px-10 grow border-l-gray-700">
        <p>{data.name}</p>
        <p>Rs. {data.price}</p>
        <p>{data.duration} Minutes</p>
        <div className="text-center">
          <Button
            name={"Remove"}
            bstyle={
              "text-red-500 border-1 border-red-500 hover:border-0 hover:bg-red-400 hover:shadow-md hover:text-white mt-4"
            }
            handleClick={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
