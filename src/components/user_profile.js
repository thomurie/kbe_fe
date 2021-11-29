import {
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import BikeCard from "./bike_card";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { addUser, currentUser } from "../features/user/userSlice";

const DESTROY_USER = gql`
  mutation Mutation($email: String!, $confirmation: Boolean!) {
    deleteUser(email: $email, confirmation: $confirmation) {
      error
      message
    }
  }
`;

/**
 * TODO
 * if the user is accessing this page,
 * hide the contact button
 * display favorites in card view (3 per page)
 * show edit
 * show delete
 * show sign out
 *
 * if auth user is accessing page contact user
 * breifly displays
 *
 * All users
 * display listings in card view (3 per page)
 * @param {*} param0
 * @returns
 */

const UserProfile = ({ data, isUser }) => {
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cuser = useSelector(currentUser);

  const {
    email,
    first_name,
    last_name,
    region,
    country,
    about,
    listings,
    favorites,
  } = data;

  const [destroyUser, { loading, error, data: mdata }] = useMutation(
    DESTROY_USER,
    {
      onCompleted(mdata) {
        if (loading) console.log("Loading.....");
        if (error) console.log(error);
        dispatch(removeUser());
        localStorage.removeItem("token");
        console.log(mdata);
      },
    }
  );
  const showEmail = () => {
    // should validate that there is a signed in user
    // then briefly display the email
  };

  const signOut = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateUser = () => {
    navigate(`/user/${email}/edit`);
  };

  const destroyClick = () => {
    destroyUser({ variables: { email: cuser.email, confirmation: true } });
    navigate("/");
  };

  return (
    <>
      {/* Name */}
      <Text fontSize="xl">
        {first_name} {last_name}.
      </Text>
      {/* Region Country */}
      <Text fontSize="xl">
        {region} | {country}
      </Text>
      {/* Contact data Should be disabled for unverified datas*/}{" "}
      <Button colorScheme="blue" onClick={showEmail}>
        Contact {first_name} {last_name}.
      </Button>
      {/* About */}
      <Text fontSize="xl">About</Text>
      <Text fontSize="sm">{about}</Text>
      <Button colorScheme="blue" onClick={() => navigate("/bikes/new")}>
        Add New Bike
      </Button>
      {/* LogOut */}
      <Button colorScheme="blue" onClick={signOut}>
        Sign Out
      </Button>
      {/* Edit */}
      <Button colorScheme="blue" onClick={updateUser}>
        Edit Profile
      </Button>
      {/* Delete */}
      <Button colorScheme="blue" onClick={destroyClick}>
        Delete Profile
      </Button>
      {/* Listings */}
      {listings ? (
        <>
          <Text fontSize="xl">Listings</Text>
          {listings.map((bike) => (
            <BikeCard data={bike} />
          ))}
        </>
      ) : (
        <></>
      )}
      {/* Favorites */}
      {favorites ? (
        <>
          <Text fontSize="xl">Favorites</Text>
          {favorites.map((bike) => (
            <BikeCard data={bike} />
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfile;
