// EXTERNAL IMPORTS
import { Alert, AlertIcon, Center } from "@chakra-ui/react";
import SkeletonBikeCard from "./BikeCardSkeleton";

// Components wrapped in this component rely on the results
// from a graphql query
const AllBikesLoading = ({ loading, error, data, children }) => {
  if (error) {
    return (
      <Center w="100%">
        <Alert status="error" mb="4">
          <AlertIcon />
          {error.message}
        </Alert>
      </Center>
    );
  }
  if (loading) {
    return new Array(6).fill(<SkeletonBikeCard />);
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default AllBikesLoading;
