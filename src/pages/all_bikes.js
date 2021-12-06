import { useQuery, gql } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BikeCard from "../components/bike_card";
import QueryResult from "../components/query_results";

const ALLBIKES = gql`
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

const AllBikes = () => {
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const [dbError, setDBError] = useState(false);

  const { loading, error, data, refetch } = useQuery(ALLBIKES, {
    variables: { offset: page, limit: 6 },
  });

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

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {dbError ? (
        <Alert status="error">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      <h1>This is All the Bikes</h1>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search by Make or Model"
          value={search}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Search" : "Clear"}
          </Button>
        </InputRightElement>
      </InputGroup>

      <QueryResult error={error} loading={loading} data={data}>
        {data?.bikes.map((bike) => (
          <BikeCard data={bike} />
        ))}
      </QueryResult>

      {page - 6 >= 0 ? (
        <Button colorScheme="blue" onClick={prevClick}>
          Previous
        </Button>
      ) : (
        <Button colorScheme="blue" disabled>
          Previous
        </Button>
      )}

      {data?.bikes.length >= 6 ? (
        <Button colorScheme="blue" onClick={nextClick}>
          Next
        </Button>
      ) : (
        <Button colorScheme="blue" disabled>
          Next
        </Button>
      )}
    </>
  );
};

export default AllBikes;
