import { useParams, Navigate } from "react-router-dom";

const PublicOnly = ({ loading, error, data, children }) => {
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
    if (!data.authUser.error) return <Navigate to="/" />;
    // return <Navigate to={`/user/${data.authUser.email}`} />;
    return children;
  }
};

export default PublicOnly;
