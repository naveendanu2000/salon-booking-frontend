import { useState, useEffect } from "react";
import SmallInfoTile from "../../smaller_components/SmallInfoTile";
import { useDispatch } from "react-redux";
import { getSalonData } from "../../../redux_logic/actionCreators/getSalonData";
import getSalonNotifcations from "../../../redux_logic/actionCreators/getSalonNotifcations";

const Notification = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [salonData, setSalonData] = useState([]);

  useEffect(() => {
    const fetchSalonData = async () => {
      const sData = await dispatch(getSalonData());

      setSalonData(sData);
    };

    fetchSalonData();
  }, [dispatch]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsData = await dispatch(
        getSalonNotifcations(salonData?.salonData?.id)
      );

      setNotifications(notificationsData);
    };

    if (salonData.salonData) fetchNotifications();
  }, [dispatch, salonData.id, salonData.salonData]);

  return (
    <div className="min-h-full">
      <h1 className="text-3xl mb-4 mx-20">Notifications</h1>

      {!notifications?.loading ? (
        notifications?.notificationsData?.length > 0 ? (
          notifications?.notificationsData?.map((item) => (
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
