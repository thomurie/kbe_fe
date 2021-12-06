import { useQuery, useMutation, gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
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
import { addUser, currentUser } from "../features/user/userSlice";
import PublicOnly from "../components/public_only";

const AUTH_USER = gql`
  query Query {
    authUser {
      error
      message
      token
      user {
        email
        first_name
        last_name
        country
        region
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

const SIGNIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      error
      message
      token
      user {
        email
        first_name
        last_name
        country
        region
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
  const navigate = useNavigate();

  const {
    loading: qloading,
    error: qerror,
    data: qdata,
    refetch,
  } = useQuery(AUTH_USER);

  const [dbError, setDBError] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { loading, data, error }] = useMutation(SIGNIN, {
    onCompleted({ loginUser }) {
      if (loading) console.log("Loading.....");
      if (error) return setDBError(error.message);
      if (loginUser.error) return setDBError(loginUser.message);
      if (!loginUser.error && loginUser.user) {
        localStorage.setItem("token", loginUser.token);
        refetch();
        navigate(`/user/${loginUser.user.email}`);
      } else {
        setDBError("500 An Unexpected Error Occured, Please try Again.");
      }
    },
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
    <>
      <PublicOnly data={qdata} error={qerror} loading={qloading}>
        {dbError ? (
          <Alert status="error">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}

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
      </PublicOnly>
    </>
  );
};

export default SignIn;
