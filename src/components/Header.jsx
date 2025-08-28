const Header = () => {
  return (
    <div className="flex flex-col h-90 bg-green-100">
      <div className="inline-block mt-auto mx-auto">
        <h1 className="font-bold">Be your self</h1>
      </div>
      <div className="inline-block mx-auto p-2">
        <h3>Discover and Book beauty, wellness near you</h3>
      </div>
      <div className="inline-block mb-auto mx-auto mt-2">
        <form>
          <input type="text" className="bg-white py-2 px-4 rounded-sm shadow w-80" placeholder="search salon by city"></input>
        </form>
      </div>
    </div>
  );
};

export default Header;
