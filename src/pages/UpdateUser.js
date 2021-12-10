// EXTERNAL IMPORTS
import { useMutation, useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertIcon, Container, Heading } from "@chakra-ui/react";

// LOCAL IMPORTS
import UserForm from "../components/UserForm";
import UserMgmt from "../hooks/userMgmt";
import UserOnly from "../components/UserOnly";
import userFormHelper from "../helpers/userFormHelper";

// APOLLO GQL QUERIES
const INTIAL_USER = gql`
  query Query($email: String!) {
    user(email: $email) {
      error
      owner
      message
      user {
        email
        first_name
        last_name
        country
        region
        phone
        sms
        bio
      }
    }
  }
`;

// APOLLO GQL MUTATIONS
const UPDATE_USER = gql`
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
      error
      message
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

// UPDATEUSER COMPONENT
const UpdateUser = () => {
  // CONFIG
  let { user_id } = useParams();
  const navigate = useNavigate();

  // STATE
  const [userForm, handleChange] = UserMgmt();
  const [dbError, setDBError] = useState(false);

  // APOLLO GQL QUERIES
  const {
    loading: qloading,
    error: qerror,
    data: qdata,
    refetch,
  } = useQuery(INTIAL_USER, {
    variables: { email: user_id },
    onCompleted({ user }) {
      if (user.user) {
        const formUpdate = {
          ...userForm,
          ...user.user,
          firstName: user.user.first_name,
          lastName: user.user.last_name,
        };
        handleChange(null, null, formUpdate);
      }
    },
  });

  // APOLLO GQL MUTATIONS
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted({ updateUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      if (updateUser.error) return setDBError(updateUser.message);
      if (!updateUser.error && updateUser.user) {
        refetch();
        localStorage.setItem("token", updateUser.token);
        navigate(`/user/${updateUser.user.email}`);
      } else {
        setDBError("500 An Unexpected Error Occured, Please try Again.");
      }
    },
  });

  // EVENT HANDLERS
  const handleSumbit = async (e) => {
    e.preventDefault();
    const validate = userFormHelper(userForm, "update");
    if (validate) {
      setDBError(validate);
      return;
    }
    updateUser({ variables: userForm });
  };

  return (
    <Container maxW="xl">
      <UserOnly data={qdata} error={qerror} loading={qloading}>
        {/* HEADING */}
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
          mb="4"
        >
          Update Your Account
        </Heading>
        {/* ERROR HANDLING */}
        {dbError ? (
          <Alert status="error" mb="2">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}
        {/* FORM */}
        <UserForm
          update={true}
          BtnName={"Update Profile"}
          handleSumbit={handleSumbit}
          form={userForm}
          handleChange={handleChange}
        />
      </UserOnly>
    </Container>
  );
};

export { INTIAL_USER };

export default UpdateUser;
