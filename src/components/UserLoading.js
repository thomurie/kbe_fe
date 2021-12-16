// EXTERNAL IMPORTS
import {
  Text,
  Center,
  Divider,
  Box,
  Alert,
  AlertIcon,
  SimpleGrid,
  Button,
  Container,
  Skeleton,
  Heading,
} from "@chakra-ui/react";

// LOCAL IMPORTS
import SkeletonBikeCard from "./BikeCardSkeleton";

// PROFILE SKELETON
const UserProfileSkeleton = () => {
  return (
    <Container maxW="container.lg">
      <Skeleton>
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
          style={{ textTransform: "capitalize" }}
        >
          Loading
        </Heading>
      </Skeleton>
      <Skeleton>
        <Heading
          as="h2"
          size="md"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          Loading | Loading
        </Heading>
      </Skeleton>
      <Box mb="6" mt="4">
        <Center>
          <Heading fontSize="xl" Box mb="1">
            About
          </Heading>
        </Center>
        <Container maxW="container.lg">
          <Divider />
          <Skeleton>
            <Text fontSize="sm" mt="2">
              Loading
            </Text>
          </Skeleton>
        </Container>
      </Box>
      <Center>
        <Button disabled>Contact</Button>
      </Center>
      <Box mb="6" mt="4">
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
          mb="4"
        >
          Listings
        </Heading>
        <SimpleGrid columns={[1, null, 3]} spacing="6" mb="4">
          {new Array(3).fill(<SkeletonBikeCard />)}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

// Components wrapped in this component rely on the results
// from a graphql query
const UserLoading = ({ loading, error, data, children }) => {
  // RETURNS
  if (error) {
    return (
      <Alert status="error" mb="4">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }
  if (loading) {
    return UserProfileSkeleton();
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default UserLoading;
