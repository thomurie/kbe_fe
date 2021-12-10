// EXTERNAL IMPORTS
import { useQuery, gql } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  SimpleGrid,
  Spacer,
  Button,
  Container,
  Flex,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// LOCAL IMPORTS
import BikeCard from "../components/BikeCard";
import QueryResult from "../components/QueryResults";

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
  const [show, setShow] = useState(true);
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
  const handleClick = () => {
    if (!show) {
      setSearch("");
      refetch({ offset: 0, search: "" });
    } else {
      setShow(!show);
      refetch({ offset: 0, search: search });
    }
    setPage(0);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setShow(true);
    setSearch(value);
  };
  const prevClick = () => {
    if (page - 6 >= 0) {
      if (!show) {
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
      if (!show) {
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
    refetch();
  }, [refetch]);

  return (
    <Container maxW="container.lg">
      {/* TITLE */}
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
      {/* SEARCH BAR */}
      <InputGroup size="md" mb="4">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search by Make or Model"
          value={search}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
            {show ? "Search" : "Clear"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* BIKE CARDS BASED ON QUERY RESULTS */}
      <QueryResult error={error} loading={loading} data={data}>
        {!data?.bikes ? (
          <Alert status="error" mb="4">
            <AlertIcon />
            No bikes on this page.
          </Alert>
        ) : (
          <SimpleGrid columns={[1, null, 3]} spacing="6" mb="4">
            {data?.bikes.map((bike) => (
              <BikeCard data={bike} key={uuidv4()} />
            ))}
          </SimpleGrid>
        )}
      </QueryResult>
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
