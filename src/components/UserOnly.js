// EXTERNAL IMPORTS
import {
  AspectRatio,
  Alert,
  AlertIcon,
  Box,
  Center,
  Button,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

// Photo skeleton
const photoSkeleton = (
  <Skeleton
    borderWidth="1px"
    borderRadius="1rem"
    overflow="hidden"
    shadow="2xl"
  >
    <Box maxW="sm">
      <Skeleton>
        <AspectRatio maxW="400px" ratio={4 / 3}>
          <Image />
        </AspectRatio>
      </Skeleton>
      <Button isFullWidth disabled>
        Delete Photo
      </Button>
    </Box>
  </Skeleton>
);

// Drag n drop skeleton
const dragSkeleton = (
  <>
    <Skeleton
      borderWidth="1px"
      borderRadius="1rem"
      overflow="hidden"
      shadow="2xl"
    >
      <Box mb="4" w="100%" p={4}>
        <p>Loading...</p>
      </Box>
    </Skeleton>
    <aside>
      <h4>Accepted files</h4>
      <ul></ul>
      <h4>Rejected files</h4>
      <ul></ul>
    </aside>
    <Center>
      <Button mt={4} isFullWidth disabled>
        Loading...
      </Button>
    </Center>
  </>
);

// USERONLY COMPONENT
// Components wrapped in this component should only be available
// to Authenticated Users, Public userss are redirected
const UserOnly = ({ type, loading, error, data, children }) => {

  // RETURNS 
  if (error) {
    return (
      <Alert status="error" textTransform={"capitalize"} mb="4">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }
  if (loading) {
    if (type === "photos") return new Array(3).fill(photoSkeleton);
    if (type === "dropzone") return dragSkeleton;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    if (data.bike && !data.bike.owner) return <Navigate to="/user/signin" />;
    return children;
  }
};

export default UserOnly;
