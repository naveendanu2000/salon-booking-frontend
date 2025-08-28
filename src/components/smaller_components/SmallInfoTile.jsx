import { useDispatch, useSelector } from "react-redux";
import { markNotificationAsRead } from "../../redux_logic/actionCreators/markNotificationAsRead";
import { useState } from "react";

const SmallInfoTile = ({ data }) => {
  const dispatch = useDispatch();
  const notificationIsRead = useSelector((state) => state.notificationIsRead);
  const [read, setRead] = useState(data.isRead);

  const handleRead = () => {
    setRead(true);
    dispatch(markNotificationAsRead(data.id));
  };

  const newData = notificationIsRead.notificationStatus;

  return (
    <div
      className={`px-10 py-5 rounded-3 w-full max-w-5xl mx-auto shadow-lg my-7 transition-transform duration-500 hover:scale-110 ${
        !newData?.isRead ? (read ? "bg-gray-200" : "bg-white") : "bg-gray-200"
      } cursor-default`}
      onClick={handleRead}
    >
      {notificationIsRead.loading ? (
        <h1 className="flex justify-center items-center text-4xl">
          Marking as Read!
        </h1>
      ) : (
        <>
          <div className="font-semibold">{data.type}</div>
          <div className="text-gray-600">{data.description}</div>
        </>
      )}
    </div>
  );
};

export default SmallInfoTile;
