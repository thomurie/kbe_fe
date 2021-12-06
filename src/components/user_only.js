import { Navigate } from "react-router-dom";

const UserOnly = ({ loading, error, data, children }) => {
  console.log(error, data);
  if (error) {
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    if (data.authUser && !data.authUser.user)
      return <Navigate to="/user/signin" />;
    if (data.user && !data.user.owner) return <Navigate to="/" />;
    if (data.bike && !data.bike.owner) return <Navigate to="/" />;
    return children;
  }
};

export default UserOnly;
