import { useState, useEffect } from "react";
import api from "../../../../public/api/api";

const TransactionTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(9);

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

  const [names, setNames] = useState({});
  const [phones, setPhones] = useState({});
  const jwt = localStorage.getItem("jwt");

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
              <th>Date</th>
              <th>Customer Details</th>
              <th>Booking</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.salonBookings.slice(start, end).map((item) => (
              <tr>
                <td>{item.startTime.split("T")[0]}</td>
                <td>
                  {" "}
                  <p>Full Name : {names[item.id]}</p>
                  <p>Phone : {phones[item.id]}</p>
                </td>
                <td>
                  <strong> {item.id} </strong>
                </td>
                <td>Rs. {item.totalPrice}</td>
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

export default TransactionTable;
