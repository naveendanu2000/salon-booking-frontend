import { useParams } from "react-router-dom";
import Button from "../components/smaller_components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getSalonDetailsById from "../redux_logic/actionCreators/getSalonDetailsById";
import getServicesBySalonId from "../redux_logic/actionCreators/getServicesBySalonId";
import SalonDetailsAllServices from "../components/SalonDetailsAllServices";
import Reviews from "../components/Reviews";
import getReviewsBySalon from "../redux_logic/actionCreators/getReviewsBySalon";
import CreateReview from "../components/CreateReview";

const SalonDetailsPage = () => {
  const { salonId } = useParams();
  const dispatch = useDispatch();
  const salonDataState = useSelector((state) => state.salonDataById);

  const salonServicesDataState = useSelector(
    (state) => state.salonServicesBySalonId
  );

  const reviewsState = useSelector((state) => state.reviewsBySalon);

  const [lowerDiv, setLowerDiv] = useState(null);
  const [selectedService, setSelectedService] = useState({});

  useEffect(() => {
    dispatch(getSalonDetailsById(salonId));
  }, [salonId, dispatch]);

  const handleSelectedService = (service) => {
    selectedService.id === service.id
      ? setSelectedService({})
      : setSelectedService(service);
  };
  // useEffect(() => {
  //   console.log(selectedService);
  // }, [selectedService]);

  const handleServices = () => {
    dispatch(getServicesBySalonId(salonId));
    lowerDiv === "services" ? setLowerDiv(null) : setLowerDiv("services");
  };

  const handleReviews = () => {
    dispatch(getReviewsBySalon(salonId));
    lowerDiv === "reviews" ? setLowerDiv(null) : setLowerDiv("reviews");
  };
  const handleCreatereviews = () => {
    lowerDiv === "createReviews"
      ? setLowerDiv(null)
      : setLowerDiv("createReviews");
  };

  return (
    <div>
      <div className="px-20 my-5">
        <div className="rounded-md m-5 max-h-100 h-100 overflow-y-hidden shadow">
          {salonDataState.loading ? (
            <div className="h-full flex justify-center items-center">
              <h1 className="text-3xl"> Loading Image! </h1>
            </div>
          ) : (
            <img
              src={salonDataState?.salonData?.images[0]}
              className="w-full h-full object-cover object-center"
              alt="salon pic"
            ></img>
          )}
        </div>
        <div className="flex flex-row">
          <div className="grow m-5 inline-block w-[48%] h-100 max-h-100 rounded-md shadow overflow-hidden">
            {salonDataState.loading ? (
              <div className="h-full flex justify-center items-center">
                <h1 className="text-3xl"> Loading Image! </h1>
              </div>
            ) : (
              <img
                src={salonDataState?.salonData?.images[1]}
                alt="salon pic"
              ></img>
            )}
          </div>
          <div className="grow m-5 inline-block w-[48%] h-100 max-h-100 rounded-md shadow overflow-hidden">
            {salonDataState.loading ? (
              <div className="h-full flex justify-center items-center">
                <h1 className="text-3xl"> Loading Image! </h1>
              </div>
            ) : (
              <img
                src={
                  salonDataState.salonData.images[2]
                    ? salonDataState?.salonData?.images[2]
                    : salonDataState?.salonData?.images[1]
                }
                alt="salon pic"
              ></img>
            )}
          </div>
        </div>
      </div>
      <div className="px-25">
        <h3>
          {salonDataState.loading ? "Loading!" : salonDataState.salonData.name}
        </h3>
        <div>
          {salonDataState.loading ? (
            "Loading!"
          ) : (
            <>
              {salonDataState.salonData.address},{" "}
              {salonDataState.salonData.city}
            </>
          )}
        </div>
        <div>
          {salonDataState.loading ? (
            "Loading!"
          ) : (
            <>
              Timings: {salonDataState.salonData.openTime} To{" "}
              {salonDataState.salonData.closeTime}
            </>
          )}
        </div>
        <hr className="my-5" />
        <Button
          name={"All Services"}
          bstyle={`border  me-5 ${
            lowerDiv === "services"
              ? "bg-green-300 text-white"
              : "text-green-600"
          }`}
          handleClick={handleServices}
        />
        <Button
          name={"Reviews"}
          bstyle={`border  me-5 ${
            lowerDiv === "reviews"
              ? "bg-green-300 text-white"
              : "text-green-600"
          }`}
          handleClick={handleReviews}
        />
        <Button
          name={"Create Review"}
          bstyle={`border  me-5 ${
            lowerDiv === "createReviews"
              ? "bg-green-300 text-white"
              : "text-green-600"
          }`}
          handleClick={handleCreatereviews}
        />
      </div>
      <div className={`${lowerDiv ? "visible" : "hidden"}`}>
        <div className={`py-5 ${lowerDiv == "services" ? "" : "hidden"}`}>
          <SalonDetailsAllServices
            salonServicesDataState={salonServicesDataState}
            handleSelectedService={handleSelectedService}
            selectedService={selectedService}
          />
        </div>
        <div className={`py-5 ${lowerDiv == "reviews" ? "" : "hidden"}`}>
          <Reviews reviewsState={reviewsState} />
        </div>
        <div className={`py-5 ${lowerDiv == "createReviews" ? "" : "hidden"}`}>
          <CreateReview salonId={salonId}/>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailsPage;
