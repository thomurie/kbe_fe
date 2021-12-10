// EXTERNAL IMPORTS
import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Flex,
  FormHelperText,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
} from "@chakra-ui/react";
// APOLLO GQL QUERIES
import static_data from "../assets/static_data.json";
import phoneHelper from "../helpers/phoneHelper";

// HELPER FUNCTIONS
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

// USER FORM COMPONENT
const UserForm = ({ update, BtnName, handleChange, handleSumbit, form }) => {
  // STATE
  const [show, setShow] = useState(false);
  // EVENT HANDLERS
  const handleClick = () => setShow(!show);

  return (
    <form onSubmit={handleSumbit}>
      {/* First name */}
      <Flex spacing={4} direction="column">
        <FormControl id="firstName" mb="4" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            textTransform={"capitalize"}
            placeholder="First name"
            value={form.firstName}
            name="firstName"
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </FormControl>
        {/* Last name */}
        <FormControl id="lastName" mb="4" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            textTransform={"capitalize"}
            placeholder="Last Name"
            value={form.lastName}
            name="lastName"
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </FormControl>
        {/* Email address */}
        {update ? (
          <FormControl id="email" mb="4" isReadOnly>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={form.email} name="email" />
          </FormControl>
        ) : (
          <FormControl id="email" mb="4" isRequired>
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
        )}

        {/* Phone number */}
        <FormControl mb="4" id="phone">
          <FormLabel>Phone</FormLabel>
          <NumberInput
            step={1}
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e)}
          >
            <NumberInputField />
          </NumberInput>
          <FormHelperText>
            Don't won't to list your phone? Just leave it blank.
          </FormHelperText>
        </FormControl>
        {/* Allow texts */}
        <Checkbox
          isChecked={form.sms}
          name="sms"
          onChange={(e) => handleChange("sms", e.target.checked)}
        >
          Allow Text
        </Checkbox>
        {/* Country */}
        <FormControl id="country" mb="4" isRequired>
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
        {/* Region */}
        <FormControl id="region" mb="4" isRequired>
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
        {/* About */}
        <FormControl id="bio" mb="4">
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Tell us about yourself"
            size="sm"
          />
          <FormHelperText>
            {form.bio.length} out of 255 available characters
          </FormHelperText>
        </FormControl>
        {/* Password */}
        <FormControl id="password" mb="4" isRequired>
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
          <FormHelperText> Must be at 8-16 characters long.</FormHelperText>
        </FormControl>
        {/* New password */}
        {update ? (
          <FormControl mb="4" id="new_password">
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
            <FormHelperText> Must be at lest 8 characters long.</FormHelperText>
          </FormControl>
        ) : null}
        {/* Confirm password */}
        <FormControl id="confirm_password" mb="4" isRequired>
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
        {/* Submit button */}
        {notEmpty(form) && form.confirmPassword ? (
          <Button type="submit" colorScheme="orange" isFullWidth>
            {BtnName}
          </Button>
        ) : (
          <Button type="submit" colorScheme="orange" isFullWidth disabled>
            {BtnName}
          </Button>
        )}
      </Flex>
    </form>
  );
};

export default UserForm;
