import { Routes, Route, Navigate } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";
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
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useState } from "react";
import Profile from "../pages/profile";

const Navagation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bikes" element={<AllBikes />} />
      <Route
        path="/bikes/new"
        element={
          <RequireAuth type="newBike">
            <CreateBike />
          </RequireAuth>
        }
      />

      <Route path="/bikes/:bike_id" element={<Bike />} />
      <Route
        path="/bikes/:bike_id/edit"
        element={
          <RequireAuth type="newBike">
            <UpdateBike />
          </RequireAuth>
        }
      />
      <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/signup" element={<SignUp />} />
      {/* This is being weird */}
      <Route path="/user/:user_id" element={<User />} />
      <Route
        path="/user/:user_id/profile"
        element={
          <RequireAuth type="user">
            <Profile />
          </RequireAuth>
        }
      />

      <Route
        path="/user/:user_id/edit"
        element={
          <RequireAuth type="user">
            <UpdateUser />
          </RequireAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Navagation;
