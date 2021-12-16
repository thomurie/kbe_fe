// EXTERNAL IMPORTS
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  SimpleGrid,
  Spacer,
  Button,
  Container,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// LOCAL IMPORTS
import BikeCard from "../components/BikeCard";
import SearchBar from "../components/SearchBar";
import AllBikesLoading from "../components/AllBikesLoading";

// APOLLO GQL QUERIES
const ALL_BIKES = gql`
  query Query($offset: Int, $limit: Int, $search: String) {
    bikes(offset: $offset, limit: $limit, search: $search) {
      bike_id
      make
      model
      year
      price
      country
      region
      photos {
        url
      }
    }
  }
`;

const COUNT_BIKES = gql`
  query Query {
    count
  }
`;

// All BIKES COMPONENT
const AllBikes = () => {
  // STATE
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(1);

  // APOLLO GQL QUERY - Retrieves all bikes
  const { loading, error, data, refetch } = useQuery(ALL_BIKES, {
    variables: { offset: page, limit: 6 },
  });

  useQuery(COUNT_BIKES, {
    onCompleted({ count }) {
      if (count) setCount(count);
    },
  });

  // EVENT HANDLERS
  const prevClick = () => {
    if (page - 6 >= 0) {
      if (!search) {
        refetch({ offset: page - 6, search: search });
      } else {
        refetch({ offset: page - 6 });
      }
      setPage(page - 6);
    }
    return;
  };

  const nextClick = () => {
    if (data?.bikes.length >= 6) {
      if (!search) {
        refetch({ offset: page + 6, search: search });
      } else {
        refetch({ offset: page + 6 });
      }
      setPage(page + 6);
    }
    return;
  };

  // ON RERENDER FETCHES NEW DATA FROM SERVER
  useEffect(() => {
    refetch({ offset: 0, search: search });
  }, [refetch, search]);

  return (
    <Container maxW="container.lg">
      {/* TITLE */}
      <Flex direction={{ base: "column", md: "row" }} mt="4">
        <Box>
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
            mb="4"
          >
            All Bikes
          </Heading>
        </Box>
        <Spacer />
        {/* SEARCH BAR */}
        <Box w={{ base: "100%", md: "30%" }}>
          <SearchBar setSearch={setSearch} setPage={setPage} />
        </Box>
      </Flex>
      <Divider mb="4" />
      {/* BIKE CARDS BASED ON QUERY RESULTS */}
      <SimpleGrid columns={[1, null, 3]} spacing="6" mb="6">
        <AllBikesLoading error={error} loading={loading} data={data}>
          {data?.bikes.map((bike) => (
            <BikeCard data={bike} key={uuidv4()} />
          ))}
        </AllBikesLoading>
      </SimpleGrid>
      {/* PAGINATION */}
      <Flex>
        <Spacer />
        {page - 6 >= 0 ? (
          <Button colorScheme="orange" onClick={prevClick}>
            Previous
          </Button>
        ) : (
          <Button colorScheme="orange" disabled>
            Previous
          </Button>
        )}
        <Spacer />
        {page + 6 <= count && !search ? (
          <Button colorScheme="orange" onClick={nextClick}>
            Next
          </Button>
        ) : (
          <Button colorScheme="orange" disabled>
            Next
          </Button>
        )}
        <Spacer />
      </Flex>
    </Container>
  );
};

export { ALL_BIKES };
export default AllBikes;
