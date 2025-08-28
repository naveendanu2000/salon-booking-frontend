import { useEffect } from "react";
import MediumCard from "./smaller_components/MediumCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getAllSalons from "../redux_logic/actionCreators/getAllSalons";

const SalonSection = () => {
  const dispatch = useDispatch();
  const allSalons = useSelector((state) => state.allSalons);

  useEffect(() => {
    dispatch(getAllSalons());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className="bg-green-100">
      <h1 className="text-4xl mb-8 font-semibold text-gray-800 ps-20 pt-16">
        Available Salons
      </h1>
      <div className="px-8 pb-8 text-center overflow-auto h-200">
        {allSalons.loading ? (
          <div className="h-full flex justify-center items-center">
            <h1 className="text-3xl">Loading Salons!</h1>
          </div>
        ) : (
          allSalons.allSalonsData.map((salon) => {
            return (
              <MediumCard
                key={salon.id}
                heading={salon.name}
                imgSrc={salon.images[0]}
                onClick={() => {
                  navigate(`/salon/${salon.id}/details`);
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SalonSection;
