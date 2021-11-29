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

const URL = "http://localhost:3000/";

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

const UserPage = ({ data }) => {
  const navigate = useNavigate();
  const cuser = useSelector(currentUser);
  const [show, setShow] = useState(false);

  const {
    email,
    first_name,
    last_name,
    region,
    phone,
    country,
    about,
    listings,
  } = data;

  const showEmail = () => {
    if (cuser.email) {
      setShow(!show);
    } else {
      navigate("/user/signin");
    }
    // should validate that there is a signed in user
    // then briefly display the email
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
      {/* Contact data Should be disabled for unverified datas*/}
      {show ? (
        <Button colorScheme="blue" onClick={showEmail}>
          {phone}
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={showEmail}>
          Contact {first_name} {last_name}.
        </Button>
      )}
      {/* About */}
      <Text fontSize="xl">About</Text>
      <Text fontSize="sm">{about}</Text>
      {/* Listings */}
      <Text fontSize="xl">Listings</Text>
      {listings.map((bike) => (
        <BikeCard data={bike} />
      ))}
    </>
  );
};

export default UserPage;
