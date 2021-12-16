// EXTERNAL IMPORTS
import { Navigate } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

// LOCAL IMPORTS
import UserForm from "./UserForm";
import UserMgmt from "../hooks/userMgmt";

// USERONLY COMPONENT
// Components wrapped in this component should only be available
// to Authenticated Users, Public userss are redirected
const UserFormLoading = ({ loading, error, data, children }) => {
  // CONFIG
  const [userForm] = UserMgmt();

  // RETURNS
  if (error) {
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    return (
      <Skeleton>
        <UserForm BtnName={"Sign Up"} form={userForm} />
      </Skeleton>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    if (data.user && !data.user.owner) return <Navigate to="/user/signin" />;
    return children;
  }
};

export default UserFormLoading;
