import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import UserMgmt from "../hooks/userMgmt";
import PublicOnly from "../components/PublicOnly";
import { IS_USER } from "./SignIn";

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

  const { loading: qloading, error: qerror, data: qdata } = useQuery(IS_USER);

  const [dbError, setDBError] = useState(false);
  const [userForm, handleChange] = UserMgmt();

  const [createUser, { loading, error }] = useMutation(SIGNUP, {
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
    if (userForm.password.length < 8 || !userForm.password) {
      setDBError("Password must be at least 8 characters long.");
      return;
    }
    if (userForm.password !== userForm.confirmPassword) {
      setDBError("Passwords Do Not Match");
      return;
    }
    createUser({ variables: userForm });
  };

  return (
    <Container maxW="xl">
      <PublicOnly data={qdata} error={qerror} loading={qloading}>
        {dbError ? (
          <Alert status="error">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
          mb="4"
        >
          Sign Up
        </Heading>
        <UserForm
          update={false}
          BtnName={"Sign Up"}
          handleSumbit={handleSumbit}
          form={userForm}
          handleChange={handleChange}
        />

        <Text fontSize="sm" mt="4">
          Already have an account?
        </Text>

        <Button
          onClick={() => navigate(`/user/signin`)}
          colorScheme="orange"
          mt="2"
          isFullWidth
        >
          Sign In
        </Button>
      </PublicOnly>
    </Container>
  );
};

export default SignUp;
