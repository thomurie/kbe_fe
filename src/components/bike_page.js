import {
  Box,
  Badge,
  AspectRatio,
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
const URL = "http://localhost:3000/bikes/";

const DESTROY_BIKE = gql`
  mutation DeleteListing($bikeId: ID!, $confirmation: Boolean!) {
    deleteListing(bike_id: $bikeId, confirmation: $confirmation) {
      error
      message
    }
  }
`;

const ADD_FAV = gql`
  mutation Mutation($bikeId: String!) {
    createFavorite(bike_id: $bikeId) {
      error
      message
    }
  }
`;

const DESTROY_FAV = gql`
  mutation Mutation($bikeId: String!) {
    deleteFavorite(bike_id: $bikeId) {
      error
      message
    }
  }
`;

/**
 * TODO
 * PHOTOS!!!
 *
 * All users
 * return to listings should track which page the user was on.
 * @param {*} param0
 * @returns
 */

function BikePage({ bike }) {
  console.log(bike);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { message } = bike;
  const [fav, setFav] = useState(message === "fav" ? "Unfavorite" : "Favorite");
  const {
    bike_id,
    user_id,
    make,
    model,
    year,
    price,
    region,
    country,
    about,
    size,
    color,
    wheel_size,
    suspension,
    front,
    rear,
    upgrades,
    photos,
  } = bike.bike;

  const photo =
    photos.length > 0 ? photos[0].url : "https://via.placeholder.com/150";

  const [deleteListing, { loading, error, data }] = useMutation(DESTROY_BIKE, {
    onCompleted(mdata) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      navigate(`/user/${user_id.email}`);
    },
  });

  const [createFavorite, { loading: floading, error: ferror, data: fdata }] =
    useMutation(ADD_FAV, {
      onCompleted(fdata) {
        if (floading) console.log("Loading.....");
        if (ferror) console.log(error);
      },
    });

  const [deleteFavorite, { loading: dloading, error: derror, data: ddata }] =
    useMutation(DESTROY_FAV, {
      onCompleted(ddata) {
        if (dloading) console.log("Loading.....");
        if (derror) console.log(error);
      },
    });

  const favClick = () => {
    if (fav === "Favorite") {
      setFav("Unfavorite");
      createFavorite({ variables: { bikeId: bike_id } });
    } else if (fav === "Unfavorite") {
      setFav("Favorite");
      deleteFavorite({ variables: { bikeId: bike_id } });
    }
  };

  return (
    <>
      {/* Back to All Bikes */}
      <Button colorScheme="blue" onClick={() => navigate("/bikes")}>
        Back to Results
      </Button>
      {/* Share */}
      <CopyToClipboard text={`${URL}${bike_id}`} onCopy={() => setCopied(true)}>
        <Button colorScheme="blue">{copied ? "Copied" : "Share Bike"}</Button>
      </CopyToClipboard>

      {bike.owner ? (
        <>
          {/* Edit */}
          <Button
            colorScheme="blue"
            onClick={() => navigate(`/bikes/${bike_id}/edit`)}
          >
            Edit Bike
          </Button>
          {/* Delete */}
          <Button
            colorScheme="blue"
            onClick={() =>
              deleteListing({
                variables: { bikeId: bike_id, confirmation: true },
              })
            }
          >
            Delete Bike
          </Button>
        </>
      ) : message ? (
        <>
          <Button
            colorScheme="blue"
            onClick={() => navigate(`/user/${user_id.email}`)}
          >
            Contact Seller
          </Button>
          <Button colorScheme="blue" onClick={favClick}>
            {fav} Bike
          </Button>
        </>
      ) : (
        <Button
          colorScheme="blue"
          onClick={() => navigate(`/user/${user_id.email}`)}
        >
          Contact Seller
        </Button>
      )}

      {/* // Images  */}
      <CloudinaryContext
        cloudName="knobbybikeexch"
        secure="true"
        upload_preset="mzzu7s1s"
      >
        <AspectRatio maxW="400px" ratio={4 / 3}>
          <Image publicId={photo} alt="Bike Image" />
        </AspectRatio>
      </CloudinaryContext>
      {/* // Make  */}
      <Text fontSize="xl">{make}</Text>
      {/* // Model  */}
      <Text fontSize="xl">{model}</Text>
      {/* Year */}
      <Text fontSize="xl">{year}</Text>
      {/* // Price  */}
      <Stat>
        <StatLabel>Asking Price</StatLabel>
        <StatNumber>${price}</StatNumber>
      </Stat>
      {/* // Region  */}
      <Text fontSize="xl">{region}</Text>
      {/* // Country  */}
      <Text fontSize="xl">{country}</Text>
      {/* // About */}
      <Text fontSize="xl">About</Text>
      <Text fontSize="sm">{about}</Text>
      {/* // SPECS */}
      <Table variant="simple" colorScheme="teal">
        <TableCaption>User input data | Not verified</TableCaption>
        <Tbody>
          <Tr>
            <Td>Size</Td>
            <Td>{size}</Td>
          </Tr>
          <Tr>
            <Td>Color</Td>
            <Td>{color}</Td>
          </Tr>
          <Tr>
            <Td>Wheel Size</Td>
            <Td>{wheel_size}</Td>
          </Tr>
          <Tr>
            <Td>Suspension Type</Td>
            <Td>{suspension}</Td>
          </Tr>
          <Tr>
            <Td>Front Travel</Td>
            <Td>{front} mm</Td>
          </Tr>
          <Tr>
            <Td>Rear Travel</Td>
            <Td>{rear} mm</Td>
          </Tr>
        </Tbody>
      </Table>
      {/* Upgrades */}
      <Text fontSize="xl">Upgrades</Text>
      <Text fontSize="sm">{upgrades}</Text>
    </>
  );
}

export default BikePage;
