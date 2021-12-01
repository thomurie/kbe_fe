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
import { useState } from "react";
import { currentUser } from "../features/user/userSlice";

const UserProfile = ({ user, authUser, deleteUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cuser = useSelector(currentUser);
  const [show, setShow] = useState(false);

  const {
    email,
    first_name,
    last_name,
    region,
    phone,
    country,
    bio,
    listings,
    favorites,
  } = user;

  const signOut = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateUser = () => {
    navigate(`/user/${email}/edit`);
  };

  const destroyClick = () => {
    deleteUser({ variables: { email: cuser.email, confirmation: true } });
    dispatch(removeUser());
    localStorage.removeItem("token");
    navigate("/");
  };

  const showPhone = () => {
    if (cuser.email) {
      setShow(!show);
    } else {
      navigate("/user/signin");
    }
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
      {show ? (
        <Button colorScheme="blue" onClick={showPhone}>
          {phone}
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={showPhone}>
          Contact {first_name} {last_name}.
        </Button>
      )}
      {/* About */}
      <Text fontSize="xl">About</Text>
      <Text fontSize="sm">{bio}</Text>
      {authUser ? (
        <>
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

          {favorites ? (
            <>
              <Text fontSize="xl">Favorites</Text>
              {favorites.map((bike) => (
                <BikeCard data={bike} />
              ))}
            </>
          ) : null}
        </>
      ) : null}
      {/* Listings */}
      <Text fontSize="xl">Listings</Text>
      {listings.map((bike) => (
        <BikeCard data={bike} />
      ))}
    </>
  );
};

export default UserProfile;
