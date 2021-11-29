import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";

const SIGNIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        email
        first_name
        last_name
        listings {
          bike_id
        }
        favorites {
          bike_id
        }
      }
    }
  }
`;

const cleanData = (data) => {
  data.email = data.email.toLowerCase();

  return data;
};

const SignIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [loginUser, { loading, error, data }] = useMutation(SIGNIN, {
    onCompleted(data) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      console.log(data);
      localStorage.setItem("token", data.loginUser.token);
      dispatch(addUser(data.loginUser.user));
      navigate(`/user/${data.loginUser.user.email}`);
    },
  });
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const update = { ...form, [name]: value };
    setForm(update);
  };

  const handleClick = () => setShow(!show);

  const handleSumbit = (e) => {
    e.preventDefault();
    cleanData(form);
    loginUser({ variables: form });
  };

  return (
    <form onSubmit={handleSumbit}>
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

      {form.email && form.password ? (
        <Button type="submit" colorScheme="blue">
          Sign In
        </Button>
      ) : (
        <Button type="submit" disabled>
          Sign In
        </Button>
      )}
      <Text fontSize="sm">Don't have an account yet?</Text>
      <Button onClick={() => navigate(`/user/signup`)} colorScheme="blue">
        Sign Up
      </Button>
    </form>
  );
};

export default SignIn;
