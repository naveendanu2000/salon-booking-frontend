/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import TransactionTable from "../AdminComponents/TransactionTable";
import { useDispatch, useSelector } from "react-redux";
import getSalonBookings from "../../../redux_logic/actionCreators/getSalonBookings";

const Transaction = () => {
  const dispatch = useDispatch();
  const salonBookingsState = useSelector((state) => state.salonBookings);

  useEffect(() => {
    dispatch(getSalonBookings());
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-4 mx-20">Transactions</h1>
      {salonBookingsState.loading ? (
        <div className="h-60 flex justify-center items-center">
          <h1 className="text-3xl">Loading Data!</h1>
        </div>
      ) : (
        <TransactionTable data={salonBookingsState} />
      )}
    </div>
  );
};

export default Transaction;
