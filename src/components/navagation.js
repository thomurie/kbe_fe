import { Routes, Route } from "react-router-dom";
import About from "../pages/about";
import AllBikes from "../pages/all_bikes";
import Bike from "../pages/bike";
import CreateBike from "../pages/create_bike";
// import components
import Home from "../pages/home";
import SignIn from "../pages/sign_in";
import SignUp from "../pages/sign_up";
import UpdateBike from "../pages/update_bike";
import RequireAuth from "./require_auth";
import User from "../pages/user";
import PageNotFound from "../pages/not_found";
import UpdateUser from "../pages/update_user";
import { currentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import AddPhotos from "../pages/create_photos";

const Navagation = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bikes" element={<AllBikes />} />
      {/* PUBLIC, UNIQUE TO AUTH */}
      <Route path="/bikes/:bike_id" element={<Bike />} />
      <Route path="/user/:user_id" element={<User />} />

      {/* PUBLIC !USER */}
      <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/signup" element={<SignUp />} />

      {/* USER */}
      <Route path="/bikes/new" element={<CreateBike />} />
      <Route path="/bikes/new/photos" element={<AddPhotos />} />

      {/* AUTH */}
      <Route path="/bikes/:bike_id/edit/photos" element={<AddPhotos />} />
      <Route path="/bikes/:bike_id/edit" element={<UpdateBike />} />
      <Route path="/user/:user_id/edit" element={<UpdateUser />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Navagation;
