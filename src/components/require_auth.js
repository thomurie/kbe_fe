import { useParams, Navigate } from "react-router-dom";
import { currentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import User from "../pages/user";

const RequireAuth = ({ children, type }) => {
  const cuser = useSelector(currentUser);
  const params = useParams();

  if (type === "user") {
    let { user_id } = params;
    if (cuser.email === user_id) return <User authUser={true} />;
    return children;
  }

  if (type === "editUser") {
    let { user_id } = params;
    if (cuser.email === user_id) return children;
  }

  if (type === "newBike") {
    if (cuser.email) return children;
  }
  if (type === "editBike") {
    let { bike_id } = params;
    if (cuser?.listings.indexOf(bike_id) !== -1) return children;
  }

  return <Navigate to="/user/signin" />;
};

export default RequireAuth;
