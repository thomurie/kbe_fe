import { useMutation, gql } from "@apollo/client";
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
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";

// The query for creating a new user, and recieving a token and user info.
const SIGNUP = gql`
  mutation Mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $country: String!
    $region: String!
  ) {
    createUser(
      email: $email
      password: $password
      first_name: $firstName
      last_name: $lastName
      country: $country
      region: $region
    ) {
      token
      user {
        email
        first_name
        last_name
      }
    }
  }
`;

// states USA

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
  delete data.confirm_password;
  data.email = data.email.toLowerCase();
  data.firstName = data.firstName.toLowerCase();
  data.lastName = data.lastName.split("")[0].toLowerCase();

  return data;
};

// validates there is the required data in the form
const notEmpty = (data) => {
  return (
    data.email &&
    data.password &&
    data.firstName &&
    data.lastName &&
    data.country &&
    data.region &&
    data.confirm_password
  );
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // allows communtication with be via graphql
  // stores the token in local storage
  // stores the user in Store
  const [createUser, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted({ createUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      localStorage.setItem("token", createUser.token);
      dispatch(addUser(createUser.user));
      console.log(createUser.user);
      console.log(createUser.token);
      navigate(`/user/${createUser.user.email}`);
    },
  });

  // manage password as text or password type
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "USA",
    region: "",
    phone: "",
    sms: true,
    bio: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "sms") value = e.target.checked;
    const update = { ...form, [name]: value };
    setForm(update);
  };

  const handleClick = () => setShow(!show);

  // validates that the user's passwords match then sends to BE
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (form.password === form.confirm_password && form.email.includes("@")) {
      cleanData(form);
      createUser({ variables: form });
    } else {
      return console.error("Passwords do not match");
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <FormControl id="firstName" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="First Name"
          value={form.firstName}
          name="firstName"
          onChange={handleChange}
        />
      </FormControl>

      {/* Stop input after === 1 */}
      <FormControl id="lastName" isRequired>
        <FormLabel>Last Initial</FormLabel>
        <Input
          placeholder="Last Initial"
          value={form.lastName}
          name="lastName"
          onChange={handleChange}
        />
        <FormHelperText>We only need your last initial</FormHelperText>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          name="email"
          onChange={handleChange}
          autoComplete="username"
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      {/* is at least 10 digits, restrict string input */}
      <FormControl id="phone">
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="Phone"
          value={form.phone}
          name="phone"
          onChange={handleChange}
        />
      </FormControl>

      <Checkbox isChecked={form.sms} name="sms" onChange={handleChange}>
        Allow Text
      </Checkbox>

      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          name="country"
          onChange={handleChange}
        >
          <option>USA</option>
          <option>CAN</option>
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
            ? states.map((s) => <option>{s}</option>)
            : provinces.map((p) => <option>{p}</option>)}
        </Select>
      </FormControl>

      <FormControl id="bio">
        <FormLabel>Bio</FormLabel>
        <Textarea
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          size="sm"
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm_password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirm_password}
            name="confirm_password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {notEmpty(form) ? (
        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      ) : (
        <Button type="submit" disabled>
          Sign Up
        </Button>
      )}
      <Text fontSize="sm">Already have an account?</Text>
      <Button onClick={() => navigate(`/user/signin`)} colorScheme="blue">
        Sign In
      </Button>
    </form>
  );
};

export default SignUp;
