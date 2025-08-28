import { useEffect } from "react";
import { useState } from "react";
import Button from "../../smaller_components/Button";
import api from "../../../../public/api/api";
import { useDispatch } from "react-redux";
import cancelBoooking from "../../../redux_logic/actionCreators/cancelBoooking";
import completeBoooking from "../../../redux_logic/actionCreators/completedBooking";

const InfoTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPages(Math.floor(data.salonBookings.length / 10) + 1);
    if (data.salonBookings.length < 10) setEnd(data.salonBookings.length);
  }, [data.salonBookings]);

  const handleUpdatePage = (page) => {
    setCurrentPage(page);
    const newStart = (page - 1) * 10;
    const newEnd = Math.min(newStart + 10, data.salonBookings.length);
    setStart(newStart);
    setEnd(newEnd);
  };

  const handleCancelBooking = (id) => {
    dispatch(cancelBoooking(id));
  };

  const handleCompleteBooking = (id) => {
    dispatch(completeBoooking(id));
  };

  const [services, setServices] = useState({});
  const [names, setNames] = useState({});
  const [phones, setPhones] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      for (const item of data.salonBookings) {
        const responseCustomer = await api.get(
          `/api/users/${item.customerId}`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        const bookingId = item.id;
        setNames((prev) => ({
          ...prev,
          [bookingId]: responseCustomer.data.fullName,
        }));
        setPhones((prev) => ({
          ...prev,
          [bookingId]: responseCustomer.data.phone,
        }));

        const servicesPerBooking = [];
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
  }, [data.salonBookings, jwt]);

  return (
    <div className="px-10">
      <div className="flex justify-center">
        <table className="w-[100%] shadow-xl overflow-hidden rounded-md text-center">
          <thead className="bg-green-500 shadow">
            <tr>
              <th>Services</th>
              <th>Time & Date</th>
              <th>Price</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Cancel</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {data.salonBookings.slice(start, end).map((item) => (
              <tr>
                <td>
                  {services[item.id]?.map((service) => <div>{service}</div>) ||
                    "Loading Services"}
                </td>
                <td>
                  {" "}
                  <p> Date : {item.startTime?.split("T")[0]}</p>
                  <p> Time : {item.startTime?.split("T")[1]}</p>
                </td>
                <td>Rs. {item.totalPrice}</td>
                <td>
                  {" "}
                  <p>Full Name : {names[item.id] || "loading Name"}</p>
                  <p>Phone : {phones[item.id] || "loading phone"}</p>
                </td>
                <td>
                  {" "}
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
                <td>
                  <div className="py-2 text-white">
                    <Button
                      name={"Cancel"}
                      bstyle={`ring-1 ring-red-600 text-red-600 hover:bg-red-400 hover:shadow:lg shadow hover:ring-0 hover:shadow-lg hover:text-white ${
                        item.status === "CANCELLED" ||
                        item.status === "COMPLETED"
                          ? "invisible "
                          : ""
                      }}`}
                      handleClick={() => {
                        handleCancelBooking(item.id);
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="py-2 text-white">
                    <Button
                      name={"Complete"}
                      bstyle={`ring-1 ring-amber-600 text-amber-600 hover:bg-amber-400 hover:shadow:lg shadow hover:ring-0 hover:shadow-lg hover:text-white ${
                        item.status === "CANCELLED" ||
                        item.status === "COMPLETED"
                          ? "invisible "
                          : ""
                      }`}
                      handleClick={() => {
                        handleCompleteBooking(item.id);
                      }}
                    />
                  </div>
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
