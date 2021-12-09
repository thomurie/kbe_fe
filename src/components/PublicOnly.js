import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const PublicOnly = ({ loading, error, data, children }) => {
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
    if (!data.authUser.error)
      return <Navigate to={`/user/${data.authUser.user.email}`} />;
    return children;
  }
};

export default PublicOnly;
