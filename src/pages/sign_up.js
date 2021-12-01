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
import UserForm from "../components/user_form";
import UserMgmt from "../hooks/userMgmt";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createUser, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted({ createUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      localStorage.setItem("token", createUser.token);
      dispatch(addUser(createUser.user));
      navigate(`/user/${createUser.user.email}`);
    },
  });

  const [userForm, handleChange] = UserMgmt();

  const handleSumbit = async (e) => {
    e.preventDefault();
    createUser({ variables: userForm });
  };

  return (
    <>
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
    </>
  );
};

export default SignUp;
