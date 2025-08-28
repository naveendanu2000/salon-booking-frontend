import React, { useEffect } from "react";
import SmallInfoTile from "../../smaller_components/SmallInfoTile";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerNotifications } from "../../../redux_logic/actionCreators/getCustomerNotifications";

const Notification = () => {
  const dispatch = useDispatch();
  const customerNotificationInfo = useSelector(
    (state) => state.customerNotificationInfo
  );

  useEffect(() => {
    dispatch(getCustomerNotifications());
  }, [dispatch]);

  return (
    <div className="min-h-full">
      <h1 className="text-3xl mb-4 mx-20">Notifications</h1>

      {!customerNotificationInfo?.loading ? (
        customerNotificationInfo?.notificationData?.length > 0 ? (
          customerNotificationInfo?.notificationData?.map((item) => (
            <SmallInfoTile key={item.id} data={item} />
          ))
        ) : (
          <div className="flex justify-center items-center h-70">
            <h1 className="text-4xl"> You are all caught Up! :{`)`}</h1>
          </div>
        )
      ) : (
        <h1 className="flex justify-center items-center text-4xl">
          LOADING Notifications!
        </h1>
      )}
    </div>
  );
};

export default Notification;
