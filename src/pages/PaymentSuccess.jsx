/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../public/api/api";
import { useDispatch } from "react-redux";
import { removeServicesCartAction } from "../redux_logic/actionCreators/servicesCartAction";
import getCustomerData from "../redux_logic/actionCreators/getCustomerData";
import getServiceById from "../redux_logic/actionCreators/getServiceById";
import getSalonDetailsById from "../redux_logic/actionCreators/getSalonDetailsById";
import { toast, Slide } from "react-toastify";

const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const cart = JSON.parse(localStorage.getItem("cart"));

  const dispatch = useDispatch();

  useEffect(() => {
    const confirmBooking = async () => {
      let attempts = 0;
      let success = false;

      while (attempts < 5 && !success) {
        try {
          await api.put(
            `/api/bookings/${bookingId}/status?status=CONFIRMED`,
            null,
            { headers: { Authorization: `Bearer ${jwt}` } }
          );
          success = true;
          toast.success("Booking Confirmed!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        } catch (error) {
          attempts++;
          console.warn(
            `Retrying booking confirmation... attempt ${attempts}`,
            error
          );
          await new Promise((res) => setTimeout(res, 1000));
        }
      }

      if (!success) {
        toast.error("Booking could not be confirmed after retries", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    };
    confirmBooking();
  }, [bookingId, jwt]);

  useEffect(() => {
    const notify = async () => {
      let salonDataState = null;

      const services = await Promise.all(
        cart.map(async (item) => {
          const service = await dispatch(getServiceById(item));
          salonDataState = await dispatch(getSalonDetailsById(service.salonId));
          return service?.name;
        })
      );

      const customerDataState = await dispatch(getCustomerData());

      let notification = "Booked ";
      services.forEach((name, i) => {
        if (services.length === 1) {
          notification += name + " ";
        } else if (i === services.length - 1) {
          notification += "and " + name + " ";
        } else {
          notification += name + ", ";
        }
      });

      notification += "in " + salonDataState.salonData.name;

      cart.forEach((item) => {
        dispatch(removeServicesCartAction(item));
      });

      await api
        .post(
          `/api/notifications`,
          {
            salonId: salonDataState.salonData.id,
            userId: customerDataState.customerData.id,
            bookingId,
            description: notification,
          },
          { headers: { Authorization: `Bearer ${jwt}` } }
        )
        .catch((error) => {
          console.error("Unable to send notification", error);
        });
    };

    if (
      localStorage.getItem("cart") &&
      !localStorage.getItem(`notified_${bookingId}`)
    ) {
      notify().then(() => {
        localStorage.setItem(`notified_${bookingId}`, "true");
      });
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-3xl">Payment Successfull!</h1>
    </div>
  );
};

export default PaymentSuccess;
