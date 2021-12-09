import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const UserOnly = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    return <Spinner size="sm" />;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    if (data.authUser && !data.authUser.user)
      return <Navigate to="/user/signin" />;
    if (data.user && !data.user.owner) return <Navigate to="/user/signin" />;
    if (data.bike && !data.bike.owner) return <Navigate to="/user/signin" />;
    return children;
  }
};

export default UserOnly;
