/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ServicesTable from "../AdminComponents/ServicesTable";
import { useDispatch, useSelector } from "react-redux";
import getServices from "../../../redux_logic/actionCreators/getServices";

const Services = () => {
  const dispatch = useDispatch();
  const servicesDataState = useSelector((state) => state.servicesData);
  const salonDataState = useSelector((state) => state.salonData);

  useEffect(() => {
    if (!salonDataState.loading && salonDataState.salonData)
      dispatch(getServices(salonDataState.salonData.id));
  }, [servicesDataState.servicesData]);

  return (
    <div>
      <h1 className="text-3xl mb-4 mx-20">Services</h1>
      {servicesDataState.loading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading Services!</h1>
        </div>
      ) : (
        <ServicesTable data={servicesDataState} />
      )}
    </div>
  );
};

export default Services;
