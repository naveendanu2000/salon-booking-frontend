const SmallCard = ({
  caption,
  imgSrc,
  handleSelectedService,
  data,
  selectedService,
  style,
}) => {
  return (
    <div
      className={`p-6 m-5 transition-transform duration-300 hover:scale-110 inline-block max-w-67 shadow rounded-md ${style} ${
        selectedService
          ? selectedService?.id === data?.id
            ? "bg-green-200"
            : ""
          : ""
      }`}
      onClick={() => {
        handleSelectedService(data);
      }}
    >
      <div className="m-2 flex justify-center items-center h-50 w-50 overflow-hidden">
        <img src={imgSrc} className="rounded-md" alt="Image" />
      </div>
      <div className="m-2 text-center">
        <h1>{caption}</h1>
      </div>
    </div>
  );
};

export default SmallCard;
