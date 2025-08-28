/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../smaller_components/Button";
import { getSalonData } from "../../../redux_logic/actionCreators/getSalonData";
import getCustomerData from "../../../redux_logic/actionCreators/getCustomerData";
import { useEffect } from "react";
import SalonData from "../AdminComponents/SalonData";
import OwnerData from "../AdminComponents/OwnerData";

const AdminAccount = () => {
  const dispatch = useDispatch();
  const salonDataState = useSelector((state) => state.salonData);
  const customerDataState = useSelector((state) => state.customerData);

  useEffect(() => {
    dispatch(getSalonData());
  }, []);

  useEffect(() => {
    dispatch(getCustomerData());
  }, []);

  return (
    <div>
      <h1 className="text-3xl mx-10">Account Details</h1>
      <div className="p-10">
        <div className="max-h-100 h-100 border m-2 overflow-hidden flex justify-center items-center">
          {!salonDataState.loading ? (
            <img
              src={
                salonDataState?.salonData?.images?.length > 0
                  ? salonDataState?.salonData?.images[0]
                  : null
              }
            ></img>
          ) : (
            <div className="flex h-[100%} w-[100%] justify-center items-center">
              <h1 className="text-3xl">Loading image!</h1>
            </div>
          )}
        </div>
        <div className="flex flex-row">
          <div className="max-h-100 h-100 grow border m-2 overflow-hidden flex justify-center items-center">
            {!salonDataState.loading ? (
              <img
                src={
                  salonDataState?.salonData?.images?.length > 1
                    ? salonDataState?.salonData?.images[1]
                    : null
                }
              ></img>
            ) : (
              <div className="flex h-[100%} w-[100%] justify-center items-center">
                <h1 className="text-3xl">Loading image!</h1>
              </div>
            )}
          </div>
          <div className="max-h-100 h-100 grow border m-2 overflow-hidden flex justify-center items-center">
            {!salonDataState.loading ? (
              <img
                src={
                  salonDataState?.salonData?.images?.length > 2
                    ? salonDataState?.salonData?.images[2]
                    : null
                }
              ></img>
            ) : (
              <div className="flex h-[100%} w-[100%] justify-center items-center">
                <h1 className="text-3xl">Loading image!</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        {customerDataState.loading ? (
          <div className="flex h-60 justify-center items-center">
            <h1>LOADING Your Details!</h1>
          </div>
        ) : (
          <OwnerData data={customerDataState} />
        )}
      </div>

      <div className="mt-30">
        {salonDataState.loading ? (
          <div className="flex h-60 justify-center items-center">
            <h1>LOADING Salon Details!</h1>
          </div>
        ) : (
          <SalonData data={salonDataState} />
        )}
      </div>
    </div>
  );
};

export default AdminAccount;
