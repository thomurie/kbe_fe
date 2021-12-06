import { useParams, Navigate } from "react-router-dom";
import { currentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import User from "../pages/user";
import { useEffect, useState } from "react";

const RequireAuth = ({ children, type, cuser }) => {
  const params = useParams();

  console.log(type, cuser);

  if (type === "public" && !cuser) {
    return children;
  } else if (type === "public") {
    return <Navigate to={`/user/${cuser.email}`} />;
  }

  if (type === "user" && cuser.email) return children;

  if (type === "auth" && cuser.email === params.user_id) return children;

  if (type === "editBike" && cuser.listings?.find((b) => b === params.bike_id))
    return children;

  return <Navigate to="/user/signin" />;
};

export default RequireAuth;
