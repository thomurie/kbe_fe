import { useMutation, useQuery, gql } from "@apollo/client";
import { useState } from "react";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const BIKE = gql`
  query Query($bikeId: ID!) {
    bike(bike_id: $bikeId) {
      user_id {
        email
        first_name
        last_name
      }
      make
      model
      year
      price
      country
      region
      size
      about
      color
      wheel_size
      suspension
      front
      rear
      upgrades
      is_active
      createdat
    }
  }
`;
// The query for creating a new user, and recieving a token and user info.
const UPDATE_BIKE = gql`
  mutation Mutation(
    $bikeId: ID!
    $make: String
    $model: String
    $year: Int
    $price: Int
    $country: String
    $region: String
    $about: String
    $size: String
    $color: String
    $wheelSize: String
    $suspension: String
    $front: Int
    $rear: Int
    $upgrades: String
  ) {
    updateListing(
      bike_id: $bikeId
      make: $make
      model: $model
      year: $year
      price: $price
      country: $country
      region: $region
      about: $about
      size: $size
      color: $color
      wheel_size: $wheelSize
      suspension: $suspension
      front: $front
      rear: $rear
      upgrades: $upgrades
    ) {
      bike_id
    }
  }
`;

// states USA

const suspension = ["full", "front", "none"];

const ws = ["26", "27.5", "29"];

const sizes = ["S", "M", "L", "XL"];

const states = [
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const colors = [
  "black",
  "blue",
  "brown",
  "green",
  "grey",
  "orange",
  "purple",
  "red",
  "silver",
  "white",
  "yellow",
  "other",
];

// provinces CAN
const provinces = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NT",
  "NS",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

// cleans the from data, ensuring continuity in the database
const cleanData = (data) => {
  data.make = data.make.toLowerCase();
  data.model = data.model.toLowerCase();
  data.year = parseInt(data.year);
  data.price = parseInt(data.price);
  data.country = data.country.toUpperCase();
  data.region = data.region.toUpperCase();
  data.size = data.size.toUpperCase() || "M";
  data.color = data.color || "black";
  data.wheelSize = data.wheelSize || "26";
  data.suspension = data.suspension.toLowerCase() || "none";
  data.front = parseInt(data.front) || 0;
  data.rear = parseInt(data.rear) || 0;

  return data;
};

// validates there is the required data in the form
const notEmpty = (data) => {
  return (
    data.make &&
    data.model &&
    data.year &&
    data.price &&
    data.country &&
    data.region
  );
};

const UpdateBike = () => {
  const navigate = useNavigate();
  const cuser = useSelector(currentUser);
  let { bike_id } = useParams();
  // allows communtication with be via graphql
  const [updateListing, { loading, error, data }] = useMutation(UPDATE_BIKE, {
    onCompleted({ updateListing }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      console.log(updateListing);
      navigate(`/bikes/${updateListing.bike_id}`);
    },
  });

  const [form, setForm] = useState({
    bikeId: bike_id,
    make: "",
    model: "",
    year: 2000,
    price: 0,
    country: "",
    region: "",
    about: "",
    size: "",
    color: "",
    wheelSize: "",
    suspension: "",
    front: 0,
    rear: 0,
    upgrades: "",
  });

  const { qloading, qerror, qdata } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
    onCompleted({ bike }) {
      console.log(bike);
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      const formUpdate = {
        ...form,
        ...bike,
        wheelSize: bike.wheel_size,
      };
      setForm(formUpdate);
    },
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    const update = { ...form, [name]: value };
    setForm(update);
  };

  const handleNumChange = (val, key) => {
    const update = { ...form, [key]: val };
    setForm(update);
  };

  // validates that the user's passwords match then sends to BE
  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(form);
    cleanData(form);
    updateListing({ variables: form });
  };

  return (
    <form onSubmit={handleSumbit}>
      <FormControl id="make" isRequired>
        <FormLabel>Make</FormLabel>
        <Input
          placeholder="Make"
          value={form.make}
          name="make"
          onChange={handleChange}
        />
      </FormControl>

      {/* Stop input after === 1 */}
      <FormControl id="model" isRequired>
        <FormLabel>Model</FormLabel>
        <Input
          placeholder="Model"
          value={form.model}
          name="model"
          onChange={handleChange}
        />
        <FormHelperText>We only need your last initial</FormHelperText>
      </FormControl>

      {/* INT */}
      <FormControl id="year" isRequired>
        <FormLabel>Year</FormLabel>
        <NumberInput
          step={1}
          min={1970}
          max={2023}
          name="year"
          value={form.year}
          onChange={(e) => handleNumChange(e, "year")}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      {/* INT */}
      <FormControl id="price" isRequired>
        <FormLabel>Price</FormLabel>
        <NumberInput
          step={10}
          defaultValue={0}
          min={0}
          max={20000}
          name="price"
          value={form.price}
          onChange={(e) => handleNumChange(e, "price")}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          name="country"
          onChange={handleChange}
        >
          {form.country === "USA" ? (
            <>
              <option selected>USA</option>
              <option>CAN</option>
            </>
          ) : (
            <>
              <option>USA</option>
              <option selected>CAN</option>
            </>
          )}
        </Select>
      </FormControl>

      <FormControl id="region" isRequired>
        <FormLabel>Region</FormLabel>
        <Select
          placeholder="Select Region"
          name="region"
          onChange={handleChange}
        >
          {form.country === "USA"
            ? states.map((s) => {
                if (s === form.region) return <option selected>{s}</option>;
                return <option>{s}</option>;
              })
            : provinces.map((p) => {
                if (p === form.region) return <option selected>{p}</option>;
                return <option>{p}</option>;
              })}
        </Select>
      </FormControl>

      <FormControl id="about">
        <FormLabel>About</FormLabel>
        <Textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="Tell us about your bike"
          size="sm"
        />
      </FormControl>

      <FormControl id="size">
        <FormLabel>Size</FormLabel>
        <Select placeholder="Select Size" name="size" onChange={handleChange}>
          {sizes.map((z) => {
            if (form.size === z) return <option selected>{z}</option>;
            return <option>{z}</option>;
          })}
        </Select>
      </FormControl>

      <FormControl id="color">
        <FormLabel>Color</FormLabel>
        <Select placeholder="Select Color" name="color" onChange={handleChange}>
          {colors.map((c) => {
            if (form.color === c) return <option selected>{c}</option>;
            return <option>{c}</option>;
          })}
        </Select>
      </FormControl>

      <FormControl id="wheel_size">
        <FormLabel>Wheel Size</FormLabel>
        <Select
          placeholder="Select Wheel Size"
          name="wheelSize"
          onChange={handleChange}
        >
          {ws.map((w) => {
            if (form.wheelSize === w) return <option selected>{w}</option>;
            return <option>{w}</option>;
          })}
        </Select>
      </FormControl>

      <FormControl id="suspension">
        <FormLabel>Suspension</FormLabel>
        <Select
          placeholder="Select Suspension Type"
          name="suspension"
          onChange={handleChange}
        >
          {suspension.map((s) => {
            if (form.suspension === s) return <option selected>{s}</option>;
            return <option>{s}</option>;
          })}
        </Select>
      </FormControl>

      <FormControl id="front">
        <FormLabel>Front</FormLabel>
        <NumberInput
          step={10}
          defaultValue={100}
          min={0}
          max={300}
          name="front"
          value={form.front}
          onChange={(e) => handleNumChange(e, "front")}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="rear">
        <FormLabel>Rear</FormLabel>
        <NumberInput
          step={10}
          defaultValue={100}
          min={0}
          max={300}
          name="rear"
          value={form.rear}
          onChange={(e) => handleNumChange(e, "rear")}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="upgrades">
        <FormLabel>Upgrades</FormLabel>
        <Textarea
          name="upgrades"
          value={form.upgrades}
          onChange={handleChange}
          placeholder="Please list any additonal upgrades or details"
          size="sm"
        />
      </FormControl>

      {notEmpty(form) ? (
        <Button type="submit" colorScheme="blue">
          Update Bike
        </Button>
      ) : (
        <Button type="submit" disabled>
          Update Bike
        </Button>
      )}
    </form>
  );
};

export default UpdateBike;
