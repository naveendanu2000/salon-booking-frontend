import { useDispatch } from "react-redux";
import SmallInfoTile from "../components/smaller_components/SmallInfoTile";
import { useEffect } from "react";
import { getCustomerNotifications } from "../redux_logic/actionCreators/getCustomerNotifications";
import { useState } from "react";
import getSalonNotifcations from "../redux_logic/actionCreators/getSalonNotifcations";
import { getSalonData } from "../redux_logic/actionCreators/getSalonData";

const NotificationPage = () => {
  const dispatch = useDispatch();

  const [salonData, setSalonData] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchSalonData = async () => {
      const sData = await dispatch(getSalonData());

      console.log(sData);
      setSalonData(sData);
    };

    fetchSalonData();
  }, [dispatch]);

  useEffect(() => {
    const fetchCustomerNotifications = async () => {
      const cNotifications = await dispatch(getCustomerNotifications());
      setNotifications(cNotifications);
    };

    const fetchSalonNotifications = async () => {
      const notificationsData = await dispatch(
        getSalonNotifcations(salonData?.salonData?.id)
      );

      console.log(notificationsData);
      setNotifications(notificationsData);
    };

    localStorage.getItem("role") === "SALON_OWNER"
      ? salonData.salonData
        ? fetchSalonNotifications()
        : null
      : fetchCustomerNotifications();
  }, [salonData.salonData, dispatch]);

  return (
    <>
      <div className="min-h-full">
        <h1 className="text-3xl mb-4 mx-20">Notifications</h1>
        {localStorage.getItem("role") === "SALON_OWNER" ? (
          <>
            {notifications?.loading ? (
              <h1 className="flex justify-center items-center text-4xl">
                LOADING Notifications!
              </h1>
            ) : notifications?.notificationsData?.length > 0 ? (
              notifications?.notificationsData?.map((item) => (
                <SmallInfoTile key={item.id} data={item} />
              ))
            ) : (
              <div className="flex justify-center items-center h-70">
                <h1 className="text-4xl"> You are all caught Up! :{`)`}</h1>
              </div>
            )}
          </>
        ) : (
          <>
            {notifications?.loading ? (
              <h1 className="flex justify-center items-center text-4xl">
                LOADING Notifications!
              </h1>
            ) : notifications?.notificationData?.length > 0 ? (
              notifications?.notificationData?.map((item) => (
                <SmallInfoTile key={item.id} data={item} />
              ))
            ) : (
              <div className="flex justify-center items-center h-70">
                <h1 className="text-4xl"> You are all caught Up! :{`)`}</h1>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NotificationPage;
