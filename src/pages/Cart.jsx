import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "../components/smaller_components/CartItems";
import getSalonDetailsById from "../redux_logic/actionCreators/getSalonDetailsById";
import DateTimePicker from "../components/smaller_components/DateTImePicker";
import BookingCustomerDetails from "../components/smaller_components/BookingCustomerDetails";
import bookingCart from "../redux_logic/actionCreators/bookingCart";

const Cart = () => {
  const servicesCart = useSelector((state) => state.servicesCart);
  const salonState = useSelector((state) => state.salonDataById);
  const customerData = useSelector((state) => state.customerData);
  const dispatch = useDispatch();
  const [salonData, setSalonData] = useState({});

  useEffect(() => {
    if (servicesCart.cart.length > 0) {
      const sdata = dispatch(getSalonDetailsById(servicesCart.cart[0].salonId));
      setSalonData(sdata);
    }
  }, [servicesCart.cart, dispatch]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDate = (date) => {
    setDate(date);
  };
  const handleTime = (time) => {
    setTime(time);
  };
  const handleSubmit = () => {
    const serviceIds = [];
    servicesCart.cart.forEach((item) => serviceIds.push(item.id));
    dispatch(
      bookingCart(servicesCart.cart[0].salonId, {
        startTime: `${date}T${time}`,
        serviceIds,
      })
    );
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
    <div>
      <hr></hr>
      <div className="px-40">
        <h1 className="text-3xl my-5">{salonState.salonData.name}</h1>
        {servicesCart.cart.length === 0 ? (
          <div className=" h-100 flex justify-center items-center">
            <h1 className="text-3xl">Cart is Empty :{`(`}</h1>
          </div>
        ) : (
          <div className="flex flex-row">
            <div className="inline-block">
              <p className="px-2 text-xl">Total Price: $ {totalPrice}</p>
              <p className="px-2 text-xl">
                Total Duration: {totalDuration} minutes
              </p>
              <div className=" h-80 overflow-auto">
                {servicesCart.cart.map((item) => (
                  <CartItems data={item} key={item.id} />
                ))}
              </div>
            </div>
            <div>
              <DateTimePicker
                handleDate={handleDate}
                handleTime={handleTime}
                disabledHours={() => {
                  const disabled = [];
                  for (let h = 0; h < 24; h++) {
                    if (
                      h < salonData.openTime.split(":")[0] ||
                      h >= salonData.closeTime.split(":")[0]
                    ) {
                      disabled.push(h);
                    }
                  }
                  return disabled;
                }}
              />
            </div>
            <div className="grow px-10">
              <BookingCustomerDetails
                handleSubmit={handleSubmit}
                customerData={customerData}
                date={date}
                time={time}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
