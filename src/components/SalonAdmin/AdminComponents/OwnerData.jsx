import React, { useState } from "react";
import Button from "../../smaller_components/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerAccount } from "../../../redux_logic/actionCreators/updateCustomerAccount";

const OwnerData = ({ data }) => {
  const dispatch = useDispatch();
  const updateCustomerAccountState = useSelector(
    (state) => state.customerUpdate
  );

  const [ownerName, setOwnerName] = useState(
    data?.customerData?.fullName || "Loading Name!"
  );
  const [ownerEmail, setOwnerEmail] = useState(
    data?.customerData?.email || "Loading Email!"
  );
  const [ownerPhone, setOwnerPhone] = useState(
    data?.customerData?.phone || "Loading Phone!"
  );

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCustomerAccount(data.customerData.id, {
        ...data.customerData,
        fullName: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
      })
    );
  };

  return (
    <div>
      <h1 className="text-2xl">Owner Details</h1>
      <form onSubmit={(e) => handleOwnerSubmit(e)}>
        <div className="shadow-xl p-10 my-10 w-max mx-auto rounded-md">
          <table className="">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="owner-name">
                    <div className="border-r my-3 py-1 px-7">Owner Name</div>
                  </label>
                </td>
                <td>
                  <input
                    id="owner-name"
                    type="text"
                    value={ownerName}
                    onChange={(e) => {
                      setOwnerName(e.target.value);
                    }}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="owner-email">
                    <div className="border-r my-3 py-1 px-7">Owner Email</div>
                  </label>
                </td>
                <td>
                  <input
                    id="owner-email"
                    type="text"
                    value={ownerEmail}
                    onChange={(e) => {
                      setOwnerEmail(e.target.value);
                    }}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="phone">
                    <div className="border-r my-3 py-1 px-7">Phone</div>
                  </label>
                </td>
                <td>
                  <input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    value={ownerPhone}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                    onChange={(e) => {
                      setOwnerPhone(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="role">
                    <div className="border-r my-3 py-1 px-7">Role</div>
                  </label>
                </td>
                <td>
                  <input
                    id="role"
                    type="text"
                    disabled={true}
                    value={data?.customerData?.role || "Loading role"}
                    className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-max mt-7 mx-auto">
            <Button
              name={updateCustomerAccountState.loading ? `Updating` : `Update`}
              bstyle={
                updateCustomerAccountState.loading
                  ? `bg-green-200`
                  : `bg-green-500`
              }
              type={"submit"}
              disabled={updateCustomerAccountState.loading}
            ></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OwnerData;
