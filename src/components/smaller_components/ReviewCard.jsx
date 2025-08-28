import { useDispatch } from "react-redux";
import getSalonDetailsById from "../../redux_logic/actionCreators/getSalonDetailsById";
import getCustomerDataById from "../../redux_logic/actionCreators/getCustomerDataById";
import { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";

const ReviewCard = ({ data }) => {
  const dispatch = useDispatch();
  const [salonData, setSalonData] = useState();
  const [userData, setUserData] = useState("Verified User");

  useEffect(() => {
    const fetchSalonData = async () => {
      const sdata = await dispatch(getSalonDetailsById(data.salonId));

      !sdata.loading ? setSalonData(sdata.salonData) : null;
    };

    fetchSalonData();
  }, [data.salonId, dispatch]);

  useEffect(() => {
    const fetchUserData = async () => {
      const udata = await dispatch(getCustomerDataById(data.userId));
      setUserData(udata);
    };

    if (localStorage.getItem("jwt")) fetchUserData();
    else
      toast.info("Login to see Reviewers!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
  }, [data.userId, dispatch]);

  return (
    <div className="rounded-xl max-w-100 min-w-96 h-full shadow-md bg-green-100 m-5 p-5 flex flex-row mx-auto">
      <div>
        <img className="h-fit w-40 rounded-lg" src={salonData?.images[0]}></img>
      </div>
      <div className="px-3">
        <h1 className="text-2xl mb-2">{userData?.fullName}</h1>
        <hr className="mb-2"></hr>
        <p>
          {data.reviewText.length > 19
            ? data.reviewText.slice(0, 19) + "..."
            : data.reviewText}
        </p>
        <div>
          {Array.from({ length: 5 }, (_, i) =>
            data.rating < i + 1 ? (
              <i key={i} className="bi bi-star m-2"></i>
            ) : data.rating > i && data.rating < i + 1 ? (
              <i key={i} className="bi bi-star-half m-2"></i>
            ) : (
              <i key={i} className="bi bi-star-fill m-2"></i>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
