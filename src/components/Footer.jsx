const Footer = () => {
  return (
    <div>
      <div className="flex flex-row items-center px-20 pt-20">
        <div className="text-center flex-grow-1">
          <h1 className="text-5xl mb-10">Salon Brokers</h1>
          <i className="bi m-3 bi-twitter-x font-light"></i>
          <i className="bi m-3 bi-instagram font-light"></i>
          <i className="bi m-3 bi-threads font-light"></i>
          <i className="bi m-3 bi-facebook font-light"></i>
        </div>
        <div className="text-center flex-grow-1">
          <h4 className="text-xl my-2">Partnership</h4>
          <h4 className="text-xl my-2">Pricing</h4>
          <h4 className="text-xl my-2">Careers</h4>
          <h4 className="text-xl my-2">Terms and Conditions</h4>
        </div>
        <div className="text-center flex-grow-1">
          <h4 className="text-xl my-2">About us</h4>
          <h4 className="text-xl my-2">Write to us</h4>
          <h4 className="text-xl my-2">salonbrokers@gmail.com</h4>
        </div>
      </div>
      <div className="text-center pb-10 pt-10">
        <i className="bi bi-c-circle"></i>{" "}
        <span className="text-sm"> Copyright. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
