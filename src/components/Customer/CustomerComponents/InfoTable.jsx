import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../../public/api/api";
import Button from "../../smaller_components/Button";
import { useDispatch } from "react-redux";
import cancelBoooking from "../../../redux_logic/actionCreators/cancelBoooking";

const InfoTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);
  const [services, setServices] = useState({});
  const [salonName, setSalonName] = useState({});
  const [salonPhone, setSalonPhone] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPages(Math.floor(data.customerBookingData.length / 10) + 1);
    if (data.customerBookingData.length < 10)
      setEnd(data.customerBookingData.length);
  }, [data.customerBookingData]);

  const handleUpdatePage = (page) => {
    setCurrentPage(page);
    const newStart = (page - 1) * 10;
    const newEnd = Math.min(newStart + 10, data.length);
    setStart(newStart);
    setEnd(newEnd);
  };

  const handleCancelBooking = (id) => {
    dispatch(cancelBoooking(id));
  };

  useEffect(() => {
    const fetchData = async () => {
      for (const item of data.customerBookingData) {
        const bookingId = item.id;
        const servicesPerBooking = [];

        const responseSalonData = await api.get(`/api/salons/${item.salonId}`);

        setSalonName((prev) => ({
          ...prev,
          [bookingId]: responseSalonData.data.name,
        }));

        setSalonPhone((prev) => ({
          ...prev,
          [bookingId]: responseSalonData.data.phoneNumber,
        }));

        for (const id of item.serviceIds) {
          const responseService = await api.get(`/api/service-offering/${id}`);
          servicesPerBooking.push(responseService.data.name);
        }

        setServices((prev) => ({
          ...prev,
          [bookingId]: servicesPerBooking,
        }));
      }
    };

    fetchData();
  }, [data.customerBookingData]);

  return (
    <div className="px-10">
      <div className="flex justify-center">
        <table className="w-[100%] shadow-xl overflow-hidden rounded-md text-center">
          <thead className="bg-green-500 shadow">
            <tr>
              <th>Services</th>
              <th>Time & Date</th>
              <th>Salon</th>
              <th>Status</th>
              <th>Price</th>
              <th>Contact No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.customerBookingData?.slice(start, end).map((item) => (
              <tr key={item.id}>
                <td>
                  {services[item.id]?.map((service) => (
                    <div key={service}>{service}</div>
                  )) || "Loading Services"}
                </td>
                <td>
                  {" "}
                  <p> Date : {item?.startTime?.split("T")[0]}</p>
                  <p> Time : {item?.startTime?.split("T")[1]}</p>
                </td>
                <td>{salonName[item.id]}</td>
                <td>
                  <p
                    className={`${
                      item.status === "CONFIRMED"
                        ? "text-green-500"
                        : item.status === "PENDING"
                        ? "text-blue-500"
                        : item.status === "COMPLETED"
                        ? "text-amber-500"
                        : "text-red-500"
                    } `}
                  >
                    {item.status}
                  </p>
                </td>
                <td>Rs. {item.totalPrice}</td>
                <td>{salonPhone[item.id]}</td>
                <td>
                  <Button
                    name={"Cancel"}
                    bstyle={`m-4 ring-1 ring-red-600 text-red-600 hover:ring-0 hover:text-white hover:bg-red-400 hover:shadow-lg ${
                      item.status === "CANCELLED" || item.status === "COMPLETED"
                        ? "invisible "
                        : ""
                    }`}
                    handleClick={() => {
                      handleCancelBooking(item.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-3xl rounded flex justify-center m-auto  mt-10">
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

export default InfoTable;
