import { useEffect, useState } from "react";
import Button from "../../smaller_components/Button";
import { useDispatch, useSelector } from "react-redux";
import getCustomerData from "../../../redux_logic/actionCreators/getCustomerData";
import { updateCustomerAccount } from "../../../redux_logic/actionCreators/updateCustomerAccount";

const CustomerAccount = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [passowrdMissmatch, setPassowrdMissmatch] = useState(false);
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const customerDataState = useSelector((state) => state.customerData);

  const customerUpdateState = useSelector((state) => state.customerUpdate);

  const handleCustomerSubmit = (e) => {
    e.preventDefault();

    if (
      currentPassword !== customerDataState.customerData.password ||
      !currentPassword.length
    ) {
      setIncorrectPassword(true);
    } else {
      setIncorrectPassword(false);
      if (
        newPassword !== confirmPassword ||
        !newPassword.length ||
        !confirmPassword.length
      ) {
        setPassowrdMissmatch(true);
      } else {
        setPassowrdMissmatch(false);
        dispatch(
          updateCustomerAccount(customerDataState.customerData.id, {
            id: customerDataState.customerData.id,
            fullName: fullName,
            username: customerDataState.customerData.username,
            email: email,
            password: currentPassword ? confirmPassword : currentPassword,
            phone: phone,
            role: customerDataState.customerData.role,
            createdAt: customerDataState.customerData.createdAt,
            updatedAt: customerDataState.customerData.updatedAt,
          })
        );

        dispatch(getCustomerData());
        setFullName(customerDataState.customerData.fullName);
        setEmail(customerDataState.customerData.email);
        setCurrentPassword(customerDataState.customerData.password);
      }
    }

    setTimeout(() => {
      setIncorrectPassword(false);
      setPassowrdMissmatch(false);
    }, 3000);
  };

  useEffect(() => {
    dispatch(getCustomerData());
    setFullName(customerDataState.customerData.fullName);
    setEmail(customerDataState.customerData.email);
    setCurrentPassword(customerDataState.customerData.password);
    setPhone(customerDataState.customerData.phone);
  }, [
    dispatch,
    customerDataState.customerData.fullName,
    customerDataState.customerData.email,
    customerDataState.customerData.phone,
    customerDataState.customerData.password,
  ]);

  return (
    <div>
      <h1 className="text-3xl mx-10">Account Details</h1>
      <div className="p-10">
        <div></div>
      </div>
      <div>
        <h1 className="text-center text-2xl">Customer Details</h1>

        {customerDataState.loading ? (
          <div className="flex justify-center items-center h-70">
            <h1 className="text-4xl"> Loading You Data!</h1>
          </div>
        ) : (
          <form onSubmit={(e) => handleCustomerSubmit(e)}>
            <div className="shadow-xl p-10 my-10 w-max mx-auto rounded-md">
              {customerUpdateState.loading ? (
                <div className="flex justify-center items-center h-70">
                  <h1 className="text-4xl"> Updating you data! :{`)`}</h1>
                </div>
              ) : (
                <>
                  <table className="">
                    <tbody>
                      <tr>
                        <td>
                          <label htmlFor="customer-name">
                            <div className="border-r my-3 py-1 px-7">
                              Customer Name
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="customer-name"
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                            }}
                            className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="customer-email">
                            <div className="border-r my-3 py-1 px-7">
                              Customer Email
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="customer-email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="customer-phone">
                            <div className="border-r my-3 py-1 px-7">
                              Customer Phone
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="customer-phone"
                            type="tel"
                            value={phone || ""}
                            maxLength={10}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="new-password">
                            <div className="border-r my-3 py-1 px-7">
                              Created On
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="created"
                            disabled={true}
                            type="text"
                            value={
                              customerDataState.customerData.createdAt
                                ? customerDataState.customerData.createdAt.slice(
                                    0,
                                    10
                                  )
                                : ""
                            }
                            className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="new-password">
                            <div className="border-r my-3 py-1 px-7">ID</div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="id"
                            disabled={true}
                            type="text"
                            value={customerDataState.customerData.id}
                            className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="current-password">
                            <div className="border-r my-3 py-1 px-7">
                              Current Password
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="current-password"
                            type="password"
                            onChange={(e) => {
                              setCurrentPassword(e.target.value);
                            }}
                            placeholder="Enter current password"
                            className={`py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10 ${
                              incorrectPassword
                                ? "ring-2 ring-red-500"
                                : "ring-0"
                            }`}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="new-password">
                            <div className="border-r my-3 py-1 px-7">
                              New Password
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="new-password"
                            type="text"
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                            }}
                            placeholder="Enter new password"
                            className="py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="confirm-new-password">
                            <div className="border-r my-3 py-1 px-7">
                              Confirm New Password
                            </div>
                          </label>
                        </td>
                        <td>
                          <input
                            id="confirm-new-password"
                            type="text"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}
                            placeholder="Confirm new password"
                            className={`py-2 px-3 w-100 inset-shadow-sm inset-shadow-gray-300 ms-7 me-10 ${
                              passowrdMissmatch
                                ? "ring-2 ring-red-500"
                                : "ring-0"
                            }`}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-max mt-7 mx-auto">
                    <Button
                      name={"Update"}
                      type={"submit"}
                      bstyle={"bg-green-500 hover:shadow-lg"}
                    ></Button>
                  </div>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerAccount;
