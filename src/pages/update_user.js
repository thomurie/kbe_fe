import { useMutation, useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addUser, currentUser } from "../features/user/userSlice";
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
} from "@chakra-ui/react";

const USERDATA = gql`
  query Query($email: String!) {
    user(email: $email) {
      first_name
      last_name
      country
      region
      email
      phone
      sms
      bio
    }
  }
`;

const UPDATEUSER = gql`
  mutation Mutation(
    $email: String!
    $password: String!
    $newPassword: String
    $firstName: String
    $lastName: String
    $country: String
    $region: String
    $phone: String
    $sms: Boolean
    $bio: String
  ) {
    updateUser(
      email: $email
      password: $password
      new_password: $newPassword
      first_name: $firstName
      last_name: $lastName
      country: $country
      region: $region
      phone: $phone
      sms: $sms
      bio: $bio
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
  return data.email && data.password;
};

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cuser = useSelector(currentUser);
  // allows communtication with be via graphql
  // stores the token in local storage
  // stores the user in Store
  const [updateUser, { loading, error, data }] = useMutation(UPDATEUSER, {
    onCompleted({ updateUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      localStorage.setItem("token", updateUser.token);
      dispatch(addUser(updateUser.user));
      console.log(updateUser.user);
      console.log(updateUser.token);
      navigate(`/user/${updateUser.user.email}`);
    },
  });

  const [form, setForm] = useState({
    email: cuser.email,
    password: "",
    firstName: "",
    lastName: "",
    country: "USA",
    region: "",
    phone: "",
    sms: true,
    bio: "",
    new_password: "",
    confirm_password: "",
  });

  const {
    loading: qloading,
    error: qerror,
    data: qdata,
  } = useQuery(USERDATA, {
    variables: { email: cuser.email },
    onCompleted({ user }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      // localStorage.setItem("token", updateUser.token);
      // dispatch(addUser(updateUser.user));
      const formUpdate = {
        ...form,
        ...user,
        firstName: user.first_name,
        lastName: user.last_name,
      };
      setForm(formUpdate);
    },
  });

  // manage password as text or password type
  const [show, setShow] = useState(false);

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
    cleanData(form);
    updateUser({ variables: form });
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

      <FormControl id="new_password">
        <FormLabel>New Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
            value={form.new_password}
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

      <FormControl id="confirm_password">
        <FormLabel>Confirm New Password</FormLabel>
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
          Update Profile
        </Button>
      ) : (
        <Button type="submit" disabled>
          Update Profile
        </Button>
      )}
    </form>
  );
};

export default UpdateUser;
