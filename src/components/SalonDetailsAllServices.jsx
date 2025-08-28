import { useEffect, useState } from "react";
import SmallCard from "./smaller_components/SmallCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addServicesCartAction,
  removeServicesCartAction,
} from "../redux_logic/actionCreators/servicesCartAction";
import InfoCard from "./smaller_components/InfoCard";
import SmallServicesTile from "./smaller_components/SmallServicesTile";
import Button from "./smaller_components/Button";
import { useNavigate } from "react-router-dom";

const SalonDetailsAllServices = ({
  salonServicesDataState,
  handleSelectedService,
  selectedService,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const servicesCart = useSelector((state) => state.servicesCart);

  const handleAddService = (service) => {
    dispatch(addServicesCartAction(service));
  };
  const handleRemoveService = (id) => {
    dispatch(removeServicesCartAction(id));
  };
  const handleBooking = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const { totalP, totalD } = servicesCart.cart.reduce(
      (acc, item) => {
        acc.totalP += item.price;
        acc.totalD += item.duration;
        return acc;
      },
      { totalP: 0, totalD: 0 }
    );

    setTotalPrice(totalP);
    setTotalDuration(totalD);
  }, [servicesCart.cart]);

  return (
    <div className="flex flex-row my-5 mx-5 pt-10">
      <div className="grow px-10 max-w-150 max-h-150">
        <h1 className="text-center text-3xl"> All Services </h1>
        <div
          className="my-5 max-w-120 max-h-120
      w-120 overflow-auto flex flex-col items-center"
        >
          {salonServicesDataState.loading ? (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="text-2xl">LOADING SERVICES!</h1>
            </div>
          ) : (
            salonServicesDataState?.salonData?.map((item) => (
              <SmallCard
                key={item.id}
                caption={item.name}
                imgSrc={item.image}
                data={item}
                handleSelectedService={handleSelectedService}
                selectedService={selectedService}
              />
            ))
          )}
        </div>
      </div>
      <div className="grow px-5">
        <h1 className="text-center text-3xl"> Service Details </h1>
        <div className={`${!selectedService.id ? "hidden" : ""} `}>
          {selectedService ? (
            <InfoCard data={selectedService} handleClick={handleAddService} />
          ) : null}
        </div>
      </div>
      <div className="grow px-10 w-140 min-w-140 max-w-120">
        <h1 className="text-center text-3xl"> Cart </h1>
        <h3 className="text-xl">Total: ${totalPrice}</h3>
        <h3 className="text-xl">Duration: {totalDuration} minutes</h3>
        <div className="max-h-90 overflow-auto flex flex-col items-center">
          {!servicesCart.loading && servicesCart.cart
            ? servicesCart.cart.map((item) => (
                <SmallServicesTile
                  key={item.id}
                  data={item}
                  handleButton={handleRemoveService}
                />
              ))
            : null}
        </div>
        <div
          className={`${
            servicesCart.cart.length === 0 ? "hidden" : ""
          } text-center`}
        >
          <Button
            name={"Order Now"}
            bstyle={
              "ring-1 ring-green-500 text-green-500 hover:text-white hover:bg-green-300 hover:shadow-md hover:ring-0 my-10"
            }
            handleClick={handleBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default SalonDetailsAllServices;
