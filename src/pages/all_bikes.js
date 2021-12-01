import { useQuery, gql } from "@apollo/client";
import {
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
import { useState } from "react";
import BikeCard from "../components/bike_card";
import QueryResult from "../components/query_results";

const ALLBIKES = gql`
  query Bikes {
    bikes {
      bike_id
      make
      model
      year
      price
      country
      region
    }
  }
`;

const AllBikes = () => {
  const { loading, error, data } = useQuery(ALLBIKES);
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    const { value } = e.target;
    setShow(true);
    setSearch(value);
  };

  const prevClick = () => {};

  const nextClick = () => {};

  return (
    <>
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
      <Button colorScheme="blue" onClick={prevClick}>
        Previous
      </Button>
      <Button colorScheme="blue" onClick={nextClick}>
        Next
      </Button>
    </>
  );
};

export default AllBikes;
