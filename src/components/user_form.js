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
import static_data from "../assets/static_data.json";

// validates there is the required data in the form
const notEmpty = (data) => {
  return (
    data.email &&
    data.password &&
    data.firstName &&
    data.lastName &&
    data.country &&
    data.region
  );
};

const UserForm = ({ update, BtnName, handleChange, handleSumbit, form }) => {
  // manage password as text or password type
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <form onSubmit={handleSumbit}>
      <FormControl id="firstName" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="First Name"
          value={form.firstName}
          name="firstName"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </FormControl>

      {/* Stop input after === 1 */}
      <FormControl id="lastName" isRequired>
        <FormLabel>Last Initial</FormLabel>
        <Input
          placeholder="Last Initial"
          value={form.lastName}
          name="lastName"
          onChange={(e) => handleChange("lastName", e.target.value)}
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
          onChange={(e) => handleChange("email", e.target.value)}
          autoComplete="username"
        />
      </FormControl>

      {/* is at least 10 digits, restrict string input */}
      <FormControl id="phone">
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="Phone"
          value={form.phone}
          name="phone"
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </FormControl>

      <Checkbox
        isChecked={form.sms}
        name="sms"
        onChange={(e) => handleChange("sms", e.target.checked)}
      >
        Allow Text
      </Checkbox>

      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          name="country"
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
        >
          {static_data.countries.map((c) => (
            <option>{c}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="region" isRequired>
        <FormLabel>Region</FormLabel>
        <Select
          placeholder="Select Region"
          name="region"
          value={form.region}
          onChange={(e) => handleChange("region", e.target.value)}
        >
          {form.country === "USA"
            ? static_data.states.map((s) => <option>{s}</option>)
            : static_data.provinces.map((p) => <option>{p}</option>)}
        </Select>
      </FormControl>

      <FormControl id="about">
        <FormLabel>About</FormLabel>
        <Textarea
          value={form.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
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
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {update ? (
        <FormControl id="new_password">
          <FormLabel>New Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="New Password"
              value={form.newPassword}
              name="newPassword"
              autoComplete="current-password"
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      ) : null}

      <FormControl id="confirm_password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            name="confirmPassword"
            autoComplete="current-password"
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
          {BtnName}
        </Button>
      ) : (
        <Button type="submit" disabled>
          {BtnName}
        </Button>
      )}
    </form>
  );
};

export default UserForm;
