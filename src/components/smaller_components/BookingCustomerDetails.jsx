import { useEffect, useState } from "react";
import Button from "./Button";
import getCustomerData from "../../redux_logic/actionCreators/getCustomerData";
import { useDispatch } from "react-redux";

const BookingCustomerDetails = ({ handleSubmit, date, time }) => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState();

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await dispatch(getCustomerData());
      setCustomerData(data);
    };
    fetchCustomer();
  }, [dispatch]);

  return (
    <div className="inline-block px-10 justify-center items-center text-center">
      <h1 className="text-3xl mb-11">Confirm Attendee</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <table className="">
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  disabled={true}
                  className="m-4 py-3 px-3 inset-shadow-sm"
                  placeholder="Full Name"
                  value={customerData?.customerData?.fullName ?? ""}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="phone">Phone: </label>
              </td>
              <td>
                <input
                  value={customerData?.customerData?.phone ?? ""}
                  type="tel"
                  disabled={true}
                  maxLength="10"
                  className="m-4 py-2 px-3 inset-shadow-sm"
                  id="phone"
                  placeholder="Phone Number"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          type={"submit"}
          name={"Book Slot"}
          bstyle={
            "my-10 ring-1 ring-green-600 text-green-600 hover:ring-0 hover:bg-green-400 hover:shadow-md hover:text-white"
          }
          disabled={!time || !date}
        />
      </form>
    </div>
  );
};

export default BookingCustomerDetails;
