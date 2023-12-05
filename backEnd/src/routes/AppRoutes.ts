import express from "express";
import {
  listCustomer,
  searchCustomer,
  updateCustomer,
  bannedCustomer,
  detailCustomer,
} from "../controllers/CustomerController";
import {
  addBanner,
  deleteBanner,
  detailBanner,
  listBanner,
  updateBanner,
} from "../controllers/BannerController";
import {
  listEvent,
  addEvent,
  detailEvent,
  updateEvent,
  deleteEvent,
  eventByUser,
} from "../controllers/EventController";
import {
  listNews,
  addNews,
  detailNews,
  updateNews,
  deleteNews,
  newsByUser,
} from "../controllers/NewsController";
import {
  listCustomerFollow,
  listUserFollow,
  follow,
  unfollow,
} from "../controllers/FollowController";
import {
  listLocation,
  addLocation,
  deleteLocation,
  listLocationById,
} from "../controllers/LocationController";
import {
  listUserSchedule,
  listCustomerSchedule,
  bookSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/ScheduleController";
import {
  listService,
  detailService,
  addService,
  deleteService,
  serviceByUser,
  updateService,
} from "../controllers/ServiceController";
import {
  listUser,
  searchUser,
  updateUser,
  bannedUser,
  detailUser,
} from "../controllers/UserController";
import {
  forget,
  forgotPassword,
  login,
  register,
  resetPassword,
  updateBan,
} from "../controllers/AccountController";
import { createVnpay } from "../controllers/VnpayController";
import {
  listWaiting,
  requestWaiting,
  acceptWaiting,
  denyWaiting,
} from "../controllers/WaitingController";

const router = express.Router();
//Auth
router.post("/api/Account/Login", login);
router.post("/api/Account/Register", register);
router.post("/api/Account/Forget", forget);
router.patch("/api/Account/ResetPassword", resetPassword);
router.put("/api/Account/UpdateBan", updateBan);
router.post("/api/Account/ForgotPassword", forgotPassword);

//Banner
router.get("/api/Banner/List", listBanner);
router.post("/api/Banner/Add", addBanner);
router.get("api/Banner/Detail?id=:id", detailBanner);
router.put("/api/Banner/Update", updateBanner);
router.delete("/api/Banner/Delete/:id", deleteBanner);

//Customer
router.get("/api/Customer/List", listCustomer);
router.get("/api/Customer/Search/:name", searchCustomer);
router.put("/api/Customer/Update", updateCustomer);
router.get("/api/Customer/Detail/:id", detailCustomer);
router.get("/api/Customer/Banned", bannedCustomer);

//Event
router.get("/api/Event/List", listEvent);
router.post("/api/Event/Add", addEvent);
router.get("/api/Event/Detail/:id", detailEvent);
router.get("/api/Event/User/:userId", eventByUser);
router.put("/api/Event/Update", updateEvent);
router.delete("/api/Event/Delete/:id", deleteEvent);

//Follow
router.get("/api/Follow/CustomerList/:customerId", listCustomerFollow);
router.get("/api/Follow/UserList/:userId", listUserFollow);
router.post("/api/Follow/Follow", follow);
router.delete("/api/Follow/Unfollow", unfollow);

//Location
router.get("/api/Location/List", listLocation);
router.get("/api/Location/List/:locationId", listLocationById);
router.post("/api/Location/Add", addLocation);
router.delete("/api/Location/Delete?id=:id", deleteLocation);

//News
router.get("/api/News/List", listNews);
router.post("/api/News/Create", addNews);
router.get("/api/News/Detail/:id", detailNews);
router.get("/api/News/User/:userId", newsByUser);
router.put("/api/News/Update", updateNews);
router.delete("/api/News/Delete/:id", deleteNews);

//Schedule
router.get("/api/Schedule/Customer/:customerId", listCustomerSchedule);
router.get("/api/Schedule/User/:userId", listUserSchedule);
router.post("/api/Schedule/Book", bookSchedule);
router.put("/api/Schedule/Update", updateSchedule);
router.delete("/api/Schedule/Delete?scheduleId=id", deleteSchedule);

//Service
router.get("/api/Service/List", listService);
router.get("/api/Service/Detail/:id", detailService);
router.get("/api/Service/User/:userId", serviceByUser);
router.post("/api/Service/Add", addService);
router.put("/api/Service/Update", updateService);
router.delete("/api/Service/Delete/:serviceId", deleteService);

//User
router.get("/api/User/List", listUser);
router.get("/api/User/Search/:name", searchUser);
router.put("/api/User/Update", updateUser);
router.get("/api/User/Detail/:id", detailUser);
router.get("/api/User/Banned", bannedUser);

//Waiting
router.get("/api/Waiting/List", listWaiting);
router.post("/api/Waiting/Request", requestWaiting);
router.post("/api/Waiting/Accept", acceptWaiting);
router.post("/api/Waiting/Deny", denyWaiting);

//VNPAY
router.post("/api/Vnpay", createVnpay);
export default router;
