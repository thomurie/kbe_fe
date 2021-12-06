import { useMutation, useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { addUser, currentUser } from "../features/user/userSlice";
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
} from "@chakra-ui/react";
import UserForm from "../components/user_form";
import UserMgmt from "../hooks/userMgmt";
import QueryResult from "../components/query_results";
import UserOnly from "../components/user_only";

const USER = gql`
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

const UPDATEUSER = gql`
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
  } = useQuery(USER, {
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

  const [updateUser, { loading, error, data }] = useMutation(UPDATEUSER, {
    onCompleted({ updateUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      if (updateUser.error) return setDBError(updateUser.message);
      if (!updateUser.error && updateUser.user) {
        console.log(updateUser);
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
    updateUser({ variables: userForm });
  };
  return (
    <UserOnly data={qdata} error={qerror} loading={qloading}>
      {dbError ? (
        <Alert status="error">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      <UserForm
        update={true}
        BtnName={"Update Profile"}
        handleSumbit={handleSumbit}
        form={userForm}
        handleChange={handleChange}
      />
    </UserOnly>
  );
};

export default UpdateUser;
