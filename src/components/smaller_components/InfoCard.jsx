import Button from "./Button";

const InfoCard = ({ data, handleClick }) => {
  return (
    <div className="flex flex-row py-10 px-10">
      <div className="grow-1 py-5">
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Price:</th>
              <td>Rs. {data.price}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{data.duration}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{data.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grow-6 py-5 px-5 flex flex-col justify-center items-center">
        <img
          className="rounded-md shadow  w-50"
          src={data.image}
          alt="service image"
        />
        <Button
          name={"ADD"}
          bstyle={"ring-1 ring-green-500 text-green-500 hover:text-white hover:bg-green-400 hover:shadow-md hover:ring-0 my-10"}
          handleClick={() => {
            handleClick(data);
          }}
        />
      </div>
    </div>
  );
};

export default InfoCard;
