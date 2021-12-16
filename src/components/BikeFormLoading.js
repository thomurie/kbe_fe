// EXTERNAL IMPORTS
import { Navigate } from "react-router-dom";
import { Alert, AlertIcon, Skeleton } from "@chakra-ui/react";
import BikeMgmt from "../hooks/bikeMgmt";
import BikeForm from "./BikeForm";
// USERONLY COMPONENT
// Components wrapped in this component should only be available
// to Authenticated Users, Public userss are redirected
const BikeFormLoading = ({ loading, error, data, children }) => {
  const [bikeForm, handleChange] = BikeMgmt();
  if (error) {
    return (
      <Alert status="error" mb="4">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }
  if (loading) {
    return (
      <Skeleton>
        <BikeForm
          BtnName={"Loading"}
          form={bikeForm}
          handleChange={handleChange}
        />
      </Skeleton>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    if (data.authUser && !data.authUser.user)
      return <Navigate to="/user/signin" />;
    if (data.bike && !data.bike.owner) return <Navigate to="/user/signin" />;
    return children;
  }
};

export default BikeFormLoading;
