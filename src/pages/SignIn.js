// EXTERNAL IMPORTS
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Alert,
  Center,
  Box,
  AspectRatio,
  Image,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";

// LOCAL IMPORTS
import PublicOnly from "../components/PublicOnly";
import HomeImg from "../assets/joshua-harvey-Na3gc82YI3Q-unsplash.jpg";
import mdAbove from "../assets/md_above.json";

// APOLLO GQL QUERIES
const IS_USER = gql`
  query Query {
    authUser {
      error
      user {
        email
      }
    }
  }
`;

// APOLLO GQL MUTATIONS
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

// HELPER FUNCITONS
// Cleans data, preps it for database
const cleanData = (data) => {
  data.email = data.email.toLowerCase();
  return data;
};

// SIGNIN COMPONENT
const SignIn = () => {
  // CONFIG
  const navigate = useNavigate();

  // STATE
  const [dbError, setDBError] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // APOLLO GQL QUERIES
  const {
    loading: qloading,
    error: qerror,
    data: qdata,
    refetch,
  } = useQuery(IS_USER);

  // APOLLO GQL MUTATIONS
  const [loginUser, { loading, error }] = useMutation(SIGNIN, {
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

  // EVENT HANDLERS
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
    <Container maxW="container.xl" mt="4">
      <PublicOnly data={qdata} error={qerror} loading={qloading}>
        <Flex
          align="center"
          justify={{ base: "center", md: "space-around", xl: "space-between" }}
          direction={{ base: "column", md: "row" }}
          wrap="no-wrap"
          minH="70vh"
          px={8}
          mb={16}
        >
          {/* Image */}
          <Box
            w={{ base: "80%", sm: "60%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
            display={mdAbove}
          >
            <AspectRatio ratio={4 / 3}>
              <Image src={HomeImg} size="50%" rounded="1rem" shadow="2xl" />
            </AspectRatio>
          </Box>
          <Stack
            spacing={4}
            w={{ base: "80%", md: "40%" }}
            align={["center", "center", "flex-start", "flex-start"]}
          >
            {/* Title */}
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center", "left", "left"]}
            >
              Sign In
            </Heading>
            {/* Error handling */}
            {dbError ? (
              <Alert status="error">
                <AlertIcon />
                {dbError}
              </Alert>
            ) : null}
            {/* Signin form */}
            <form onSubmit={handleSumbit}>
              {/* Email address */}
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
              {/* Password */}
              <FormControl id="password" isRequired mb="4">
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
              {/* Submit button */}
              {form.email && form.password ? (
                <Button type="submit" colorScheme="orange" isFullWidth>
                  Sign In
                </Button>
              ) : (
                <Button type="submit" isFullWidth disabled>
                  Sign In
                </Button>
              )}
              {/* Sign up prompt */}
              <Text fontSize="sm" mt="4">
                Don't have an account yet?
              </Text>
              {/* Sign up button */}
              <Center>
                <Button
                  onClick={() => navigate(`/user/signup`)}
                  colorScheme="orange"
                  mt="2"
                  isFullWidth
                >
                  Sign Up
                </Button>
              </Center>
            </form>
          </Stack>
        </Flex>
      </PublicOnly>
    </Container>
  );
};

export { IS_USER };
export default SignIn;
