import { useMutation, useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { addUser, currentUser } from "../features/user/userSlice";
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
} from "@chakra-ui/react";
import UserForm from "../components/user_form";
import UserMgmt from "../hooks/userMgmt";

const USERDATA = gql`
  query Query($email: String!) {
    user(email: $email) {
      first_name
      last_name
      country
      region
      email
      phone
      sms
      bio
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
      token
      user {
        email
        first_name
        last_name
      }
    }
  }
`;

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cuser = useSelector(currentUser);
  const [userForm, handleChange] = UserMgmt();
  // allows communtication with be via graphql
  // stores the token in local storage
  // stores the user in Store
  const [updateUser, { loading, error, data }] = useMutation(UPDATEUSER, {
    onCompleted({ updateUser }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      localStorage.setItem("token", updateUser.token);
      dispatch(addUser(updateUser.user));
      console.log(updateUser.user);
      console.log(updateUser.token);
      navigate(`/user/${updateUser.user.email}`);
    },
  });

  const {
    loading: qloading,
    error: qerror,
    data: qdata,
  } = useQuery(USERDATA, {
    variables: { email: cuser.email },
    onCompleted({ user }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      // localStorage.setItem("token", updateUser.token);
      // dispatch(addUser(updateUser.user));
      const formUpdate = {
        ...userForm,
        ...user,
        firstName: user.first_name,
        lastName: user.last_name,
      };
      handleChange(null, null, formUpdate);
    },
  });

  // validates that the user's passwords match then sends to BE
  const handleSumbit = async (e) => {
    e.preventDefault();
    updateUser({ variables: userForm });
  };
  return (
    <UserForm
      update={true}
      BtnName={"Update Profile"}
      handleSumbit={handleSumbit}
      form={userForm}
      handleChange={handleChange}
    />
  );
};

export default UpdateUser;
