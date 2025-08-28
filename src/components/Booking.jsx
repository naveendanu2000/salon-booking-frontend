import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalonServices } from "../redux_logic/actionCreators/salonActions";
import { useParams } from "react-router-dom";
import TimePicker from "./smaller_components/TimePicker";

const Booking = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const loginData = useSelector((state) => state.login.loginData);

  const dispatch = useDispatch();
  const { salonId } = useParams();
  dispatch(getSalonServices(salonId));

  const salonServices = useSelector(
    (state) => state.salonServicesInfo.salonData
  );

  const [selectedService, setSelectedService] = useState("");
  const [hours, setHours] = useState("9");
  const [minutes, setMinutes] = useState("0");

  const handleHours = (hours) => {
    setHours(hours);
  };

  const handleMinutes = (minutes) => {
    setMinutes(minutes);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td className="col-span-2">
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    Select service
                  </option>
                  {salonServices.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <TimePicker hours={handleHours} minutes={handleMinutes} />
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Booking;
