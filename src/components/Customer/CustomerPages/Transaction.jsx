import React, { useEffect } from "react";
import TransactionTable from "../CustomerComponents/TransactionTable";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerBookings } from "../../../redux_logic/actionCreators/getCustomerBookings";

const Transaction = () => {
  const dispatch = useDispatch();
  const customerBookinginfo = useSelector((state) => state.customerBookingInfo);

  useEffect(() => {
    dispatch(getCustomerBookings());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl mb-4 mx-20">Transactions</h1>
      <TransactionTable data={customerBookinginfo} />
    </div>
  );
};

export default Transaction;
