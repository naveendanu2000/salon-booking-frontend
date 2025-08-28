import React, { useEffect } from "react";
import InfoTable from "../CustomerComponents/InfoTable";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerBookings } from "../../../redux_logic/actionCreators/getCustomerBookings";

const Booking = () => {
  const dispatch = useDispatch();
  const customerBookinginfo = useSelector((state) => state.customerBookingInfo);

  useEffect(() => {
    dispatch(getCustomerBookings());
  }, [dispatch]);

  return (
    <div className="min-h-full">
      <h1 className="text-3xl mb-4 mx-20">Bookings</h1>
      {customerBookinginfo.loading ? (
        <div className="flex justify-center items-center h-70">
          <h1 className="text-4xl">LOADING</h1>
        </div>
      ) : (
        <InfoTable data={customerBookinginfo || []} />
      )}
    </div>
  );
};

export default Booking;
