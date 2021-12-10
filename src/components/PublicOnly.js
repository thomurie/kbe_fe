// EXTERNAL IMPORTS
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

// Components wrapped in this component should only be available
// to Public Users, Authenticated users are redirected
const PublicOnly = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    return <Loading />;
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
