import { useQuery, useMutation, gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";
import static_data from "../assets/static_data.json";
import UserForm from "../components/user_form";
import UserMgmt from "../hooks/userMgmt";
import PublicOnly from "../components/public_only";
// The query for creating a new user, and recieving a token and user info.

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

const SIGNUP = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $country: String!
    $region: String!
    $phone: String
    $sms: Boolean
    $bio: String
  ) {
    createUser(
      email: $email
      password: $password
      first_name: $firstName
      last_name: $lastName
      country: $country
      region: $region
      phone: $phone
      sms: $sms
      bio: $bio
    ) {
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

const SignUp = () => {
  const navigate = useNavigate();

  const {
    loading: qloading,
    error: qerror,
    data: qdata,
    refetch,
  } = useQuery(AUTH_USER);

  const [dbError, setDBError] = useState(false);
  const [userForm, handleChange] = UserMgmt();

  const [createUser, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted({ createUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      if (createUser.error) return setDBError(createUser.message);
      if (createUser) console.log(createUser);
      localStorage.setItem("token", createUser.token);
      navigate(`/user/${createUser.user.email}`);
    },
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    createUser({ variables: userForm });
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
        <UserForm
          update={false}
          BtnName={"Sign Up"}
          handleSumbit={handleSumbit}
          form={userForm}
          handleChange={handleChange}
        />
        <Button onClick={() => navigate(`/user/signin`)} colorScheme="blue">
          Sign In
        </Button>
      </PublicOnly>
    </>
  );
};

export default SignUp;
