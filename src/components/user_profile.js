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
import { Alert, AlertIcon } from "@chakra-ui/alert";

const UserProfile = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cuser = useSelector(currentUser);
  const [show, setShow] = useState(false);
  const [dbError, setDBError] = useState(false);

  if (user.error && !user.user)
    return (
      <Alert status="error">
        <AlertIcon />
        {user.message}
      </Alert>
    );

  const { message } = user;

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
  } = user.user;

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateUser = () => {
    navigate(`/user/${email}/edit`);
  };

  const destroyClick = () => {
    deleteUser({ variables: { email: email, confirmation: true } });
    navigate("/");
  };

  const showPhone = () => {
    if (message) {
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
      {/* About */}
      <Text fontSize="xl">About</Text>
      <Text fontSize="sm">{bio}</Text>
      {user.owner ? (
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
      ) : show ? (
        <Button colorScheme="blue" onClick={showPhone}>
          {phone} | {email}
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={showPhone}>
          Contact {first_name} {last_name}.
        </Button>
      )}
      {/* Listings */}
      <Text fontSize="xl">Listings</Text>
      {listings.map((bike) => (
        <BikeCard data={bike} />
      ))}
    </>
  );
};

export default UserProfile;
