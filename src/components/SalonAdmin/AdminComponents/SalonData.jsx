import React, { useEffect, useState } from "react";
import Button from "../../smaller_components/Button";
import { useDispatch, useSelector } from "react-redux";
import updateSalonData from "../../../redux_logic/actionCreators/updateSalonData";

const SalonData = ({ data }) => {
  const dispatch = useDispatch();
  const updateSalonDataState = useSelector((state) => state.salonDataUpdate);

  const [salonName, setSalonName] = useState("");
  const [salonAddress, setSalonAddress] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  useEffect(() => {
    setSalonName(data.salonData.name);
    setSalonAddress(data.salonData.address + ` ` + data.salonData.city);
    setOpenTime(data.salonData.openTime);
    setCloseTime(data.salonData.closeTime);
  }, [data.salonData]);

  const handleSalonSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSalonData(data.salonData.id, {
        ...data.salonData,
        name: salonName,
        address: salonAddress,
        openTime,
        closeTime,
      })
    );
  };

  return (
    <div>
      <h1 className="text-2xl">{data.salonData.name} Details</h1>
      <form onSubmit={(e) => handleSalonSubmit(e)}>
        <div className="shadow-xl p-10 my-10 w-max mx-auto rounded-md">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="salon-name">
                    <div className="border-r my-3 py-1 px-7">Salon Name</div>
                  </label>
                </td>
                <td>
                  <input
                    id="salon-name"
                    type="text"
                    value={salonName}
                    onChange={(e) => {
                      setSalonName(e.target.value);
                    }}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="salon-email">
                    <div className="border-r my-3 py-1 px-7">Salon Address</div>
                  </label>
                </td>
                <td>
                  <input
                    id="salon-email"
                    type="text"
                    value={salonAddress}
                    onChange={(e) => {
                      setSalonAddress(e.target.value);
                    }}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="open-time">
                    <div className="border-r my-3 py-1 px-7">Open Time</div>
                  </label>
                </td>
                <td>
                  <input
                    id="open-time"
                    type="text"
                    value={openTime}
                    onChange={(e) => {
                      setOpenTime(e.target.value);
                    }}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="close-time">
                    <div className="border-r my-3 py-1 px-7">Close Time</div>
                  </label>
                </td>
                <td>
                  <input
                    id="close-time"
                    type="text"
                    value={closeTime}
                    onChange={(e) => {
                      setCloseTime(e.target.value);
                    }}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-max mt-7 mx-auto">
            <Button
              name={updateSalonDataState.loading ? `Updating` : `Update`}
              bstyle={
                updateSalonDataState.loading ? `bg-green-200` : `bg-green-500`
              }
              type={"submit"}
              disabled={updateSalonDataState.loading}
            ></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SalonData;
