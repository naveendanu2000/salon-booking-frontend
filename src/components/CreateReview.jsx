/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "./smaller_components/Button";
import { useDispatch } from "react-redux";
import getCustomerData from "../redux_logic/actionCreators/getCustomerData";
import createReview from "../redux_logic/actionCreators/createReview";

const CreateReview = ({ salonId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const cdata = await dispatch(getCustomerData());
      setCustomerData(cdata);
    };

    fetchUser();
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(
      createReview(
        { reviewText, rating, salonId, userId: customerData.customerData.id },
        salonId
      )
    );
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="px-[6rem] pt-10">
      <h1 className="text-3xl py-8">
        Leave a Review! We Appreciate your feedback.
      </h1>
      <div className="text-center">
        <form onSubmit={handleSubmitReview}>
          <table className=" w-100 mx-auto">
            <tbody>
              <tr>
                <td className="p-10">Ratings</td>
                <td>
                  <i
                    className={`bi m-2 cursor-pointer ${
                      rating >= 1 ? "bi-star-fill" : "bi-star"
                    }`}
                    onClick={() => {
                      setRating(1);
                    }}
                  />
                  <i
                    className={`bi m-2 cursor-pointer ${
                      rating >= 2 ? "bi-star-fill" : "bi-star"
                    }`}
                    onClick={() => {
                      setRating(2);
                    }}
                  />
                  <i
                    className={`bi m-2 cursor-pointer ${
                      rating >= 3 ? "bi-star-fill" : "bi-star"
                    }`}
                    onClick={() => {
                      setRating(3);
                    }}
                  />
                  <i
                    className={`bi m-2 cursor-pointer ${
                      rating >= 4 ? "bi-star-fill" : "bi-star"
                    }`}
                    onClick={() => {
                      setRating(4);
                    }}
                  />
                  <i
                    className={`bi m-2 cursor-pointer ${
                      rating === 5 ? "bi-star-fill" : "bi-star"
                    }`}
                    onClick={() => {
                      setRating(5);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="p-10">
                  <textarea
                    className="p-5"
                    cols={"40"}
                    rows={"10"}
                    value={reviewText}
                    placeholder="Tell us more!"
                    onChange={(e) => {
                      setReviewText(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            name={"Add Review"}
            bstyle={`ring-1 ring-green-600 text-green-600 hover:text-white hover:ring-0 hover:bg-green-300 hover:shadow-md mx-auto my-10`}
            type={"submit"}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
