import ReviewCard from "./smaller_components/ReviewCard";

const Reviews = ({ reviewsState }) => {
  return (
    <div className="px-[5rem] pt-10">
      {reviewsState.loading ? (
        <div className="w-full max-h-150 flex justify-center items-center overflow-auto">
          <h1 className="text-3xl">LOADING REVIEWS!</h1>
        </div>
      ) : (
        <div className="flex items-center flex-wrap gap-1">
          {reviewsState.reviews.map((review) => (
            <ReviewCard key={review.id} data={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
