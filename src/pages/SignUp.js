// EXTERNAL IMPORTS
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

// LOCAL IMPORTS
import UserForm from "../components/UserForm";
import UserMgmt from "../hooks/userMgmt";
import PublicOnly from "../components/PublicOnly";
import { IS_USER } from "./SignIn";
import userFormHelper from "../helpers/userFormHelper";

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
  // CONFIG
  const navigate = useNavigate();

  // STATE
  const [dbError, setDBError] = useState(false);
  const [userForm, handleChange] = UserMgmt();

  // APOLLO GQL QUERIES
  const {
    loading: qloading,
    error: qerror,
    data: qdata,
    refetch,
  } = useQuery(IS_USER);

  // APOLLO GQL MUTATIONS
  const [createUser, { loading, error }] = useMutation(SIGNUP, {
    onCompleted({ createUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      if (createUser.error) return setDBError(createUser.message);
      if (!createUser.error && createUser.user) {
        localStorage.setItem("token", createUser.token);
        refetch();
        navigate(`/user/${createUser.user.email}`);
      }
    },
  });

  // EVENT HANDLERS
  const handleSumbit = async (e) => {
    e.preventDefault();
    const validate = userFormHelper(userForm);
    if (validate) {
      setDBError(validate);
      return;
    }
    createUser({ variables: userForm });
  };

  return (
    <Container maxW="xl">
      {/* HEADING */}
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
      {/* ERROR HANDLING */}
      {dbError ? (
        <Alert status="error" mb="2">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      <PublicOnly type="signup" data={qdata} error={qerror} loading={qloading}>
        <UserForm
          update={false}
          BtnName={"Sign Up"}
          handleSumbit={handleSumbit}
          form={userForm}
          handleChange={handleChange}
        />
      </PublicOnly>
      {/* EXISTING USERS */}
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
    </Container>
  );
};

export default SignUp;
