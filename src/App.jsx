import { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Admin from "./components/SalonAdmin/Admin";
import Footer from "./components/Footer";
import NotificationPage from "./pages/NotificationPage";
import SalonDetailsPage from "./pages/SalonDetailsPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Customer from "./components/Customer/Customer";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import BecomePartner from "./pages/BecomePartner";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";

import { updateSalon } from "./redux_logic/actionCreators/registerSalon";
import { getSalonData } from "./redux_logic/actionCreators/getSalonData";
import getCustomerData from "./redux_logic/actionCreators/getCustomerData";
import getServiceById from "./redux_logic/actionCreators/getServiceById";
import { addServicesCartAction } from "./redux_logic/actionCreators/servicesCartAction";

import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const salonDataState = useSelector((state) => state.salonData);
  const servicesCart = useSelector((state) => state.servicesById);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      const role = localStorage.getItem("role");
      const fullName = localStorage.getItem("fullName");
      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: { jwt, role, fullName },
      });
      dispatch(getCustomerData());
      if (role === "SALON_OWNER") dispatch(getSalonData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      localStorage.getItem("jwt") &&
      localStorage.getItem("role") === "SALON_OWNER" &&
      !salonDataState.loading &&
      !salonDataState.salonData
    ) {
      dispatch(updateSalon());
    }
  }, [dispatch, salonDataState.loading, salonDataState.salonData]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      storedCart.forEach(async (id) => {
        const service = await dispatch(getServiceById(id));
        dispatch(addServicesCartAction(service));
      });
    };

    loadCart();
  }, [dispatch]);

  useEffect(() => {
    servicesCart?.cart?.forEach((item) => {
      dispatch(addServicesCartAction(item));
    });
  }, [servicesCart, dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/salon/:salonId/details" element={<SalonDetailsPage />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route
          path="/customer/*"
          element={
            <PrivateRoute>
              <Customer />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="/registerSalon" element={<BecomePartner />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-success/:bookingId"
          element={<PaymentSuccess />}
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
