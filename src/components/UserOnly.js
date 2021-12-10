// EXTERNAL IMPORTS
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

// USERONLY COMPONENT
// Components wrapped in this component should only be available
// to Authenticated Users, Public userss are redirected
const UserOnly = ({ loading, error, data, children }) => {
  if (error) {
    console.log("ERRRORROOROROR", error);
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    console.log(loading);
    return <Loading />;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    console.log("DATATATATATATATATATATA", data);
    if (data.authUser && !data.authUser.user)
      return <Navigate to="/user/signin" />;
    if (data.user && !data.user.owner) return <Navigate to="/user/signin" />;
    if (data.bike && !data.bike.owner) return <Navigate to="/user/signin" />;
    return children;
  }
};

export default UserOnly;
