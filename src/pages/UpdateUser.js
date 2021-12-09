import { useMutation, useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertIcon, Container, Heading } from "@chakra-ui/react";
import UserForm from "../components/UserForm";
import UserMgmt from "../hooks/userMgmt";
import UserOnly from "../components/UserOnly";

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

const UpdateUser = () => {
  let { user_id } = useParams();
  const navigate = useNavigate();
  const [userForm, handleChange] = UserMgmt();
  const [dbError, setDBError] = useState(false);

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

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (userForm.newPassword) {
      if (userForm.newPassword.length < 8) {
        setDBError("Password must be at least 8 characters long.");
        return;
      }
      if (userForm.newPassword !== userForm.confirmPassword) {
        setDBError("New Passwords Do Not Match");
        return;
      }
    } else if (userForm.password) {
      if (userForm.password !== userForm.confirmPassword) {
        setDBError("Passwords Do Not Match");
        return;
      }
    }
    updateUser({ variables: userForm });
  };
  return (
    <Container maxW="xl">
      <UserOnly data={qdata} error={qerror} loading={qloading}>
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
          Update Your Account
        </Heading>
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
