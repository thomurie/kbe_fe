// EXTERNAL IMPORTS
import { Navigate } from "react-router-dom";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import UserForm from "./UserForm";
import UserMgmt from "../hooks/userMgmt";

// Components wrapped in this component should only be available
// to Public Users, Authenticated users are redirected
const PublicOnly = ({ type, loading, error, data, children }) => {
  // STATE
  const [userForm] = UserMgmt();

  // Skeleton sign in form
  const signInLoading = (
    <Stack
      spacing={4}
      w={{ base: "100%", md: "80%", lg: "50%" }}
      align={["center", "center", "flex-start", "flex-start"]}
    >
      <FormControl mb="4">
        <FormLabel>Email address</FormLabel>
        <Skeleton w="100%">
          <Input />
        </Skeleton>
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Password</FormLabel>
        <Skeleton w="100%">
          <Input />
        </Skeleton>
      </FormControl>

      <Button isFullWidth disabled>
        Sign In
      </Button>
    </Stack>
  );
  // Skeleton sign up form
  const signUpLoading = (
    <Skeleton>
      <UserForm BtnName={"Sign Up"} form={userForm} />
    </Skeleton>
  );

  // RETURNS
  if (error) {
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    if (type === "signin") return signInLoading;
    else if (type === "signup") return signUpLoading;
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
