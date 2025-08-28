import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl mb-4 mx-20">Dashboard</h1>
      <div className="px-5">
        <div className="flex flex-column h-100">
          <div className="grow border-r p-5">
            <h1>Graph</h1>
          </div>
          <div className="w-100 p-5">
            <div className="m-5 p-5 rounded-md border">Revenue: </div>
            <div className="m-5 p-5 rounded-md border">Bookings: </div>
            <div className="m-5 p-5 rounded-md border">Services: </div>
            <div className="m-5 p-5 rounded-md border">Notifications: </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
