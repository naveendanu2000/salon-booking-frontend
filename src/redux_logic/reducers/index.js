import { combineReducers } from "redux";
import partnerReducer from "./partnerReducer";
import userReducer from "./userReducer";
import login from "./loginReducer";
import signup from "./signupReducer";
import salonRegister from "./registerSalonReducer";
import salonServicesInfo from "./salonServicesReducer";
import customerBookingInfo from "./customerBookingReducer";
import customerNotificationInfo from "./customerNotificationReducer";
import notificationIsRead from "./notificationReadReducer";
import customerData from "./customerDataReducer";
import customerUpdate from "./customerAccountUpdateReducer";
import salonData from "./salonDataReducer";
import salonDataUpdate from "./salonDataUpdateReducer";
import categoriesData from "./categoriesReducer";
import createCategory from "./createCategoryReducer";
import deleteCategory from "./deleteCategoryReducer";
import servicesData from "./getServicesReducer";
import updateService from "./updateServiceReducer";
import salonBookings from "./salonBookingReducer";
import allSalons from "./getAllSalonsReducer";
import salonDataById from "./salonDataByIdReducer";
import salonServicesBySalonId from "./salonServicesReducer";
import servicesCart from "./servicesCartReducer";
import servicesById from "./servicesByIDReducer";
import bookingCartReducer from "./bookingCartReducer";
import cancelBookingReducer from "./cancelBookingReducer";
import reviewsBySalon from "./reviewsBySalon";
import customerDataById from "./customerDataByIdReducer";
import createReview from "./createReviewReducer";
import completeBooking from "./completeBookingReducer";
import salonNotifications from "./salonNotificationsReducer";

export const rootReducer = combineReducers({
  partnerReducer,
  userReducer,
  login,
  signup,
  salonRegister,
  salonServicesInfo,
  salonData,
  salonDataUpdate,
  customerBookingInfo,
  customerNotificationInfo,
  notificationIsRead,
  customerData,
  customerUpdate,
  categoriesData,
  createCategory,
  deleteCategory,
  servicesData,
  updateService,
  salonBookings,
  salonDataById,
  allSalons,
  salonServicesBySalonId,
  servicesById,
  servicesCart,
  bookingCartReducer,
  cancelBookingReducer,
  reviewsBySalon,
  customerDataById,
  createReview,
  completeBooking,
  salonNotifications,
});
