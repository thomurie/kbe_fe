import { useMutation, useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import BikeForm from "../components/BikeForm";
import BikeMgmt from "../hooks/bikeMgmt";
import { useState } from "react";
import UserOnly from "../components/UserOnly";
import { Alert, AlertIcon, Button, Container, Heading } from "@chakra-ui/react";

const BIKE_INFO = gql`
  query Query($bikeId: ID!) {
    bike(bike_id: $bikeId) {
      error
      message
      owner
      bike {
        user_id {
          email
          first_name
          last_name
        }
        bike_id
        make
        model
        year
        price
        country
        region
        about
        size
        color
        wheel_size
        suspension
        front
        rear
        upgrades
      }
    }
  }
`;

const UPDATE_BIKE = gql`
  mutation Mutation(
    $bikeId: ID!
    $make: String
    $model: String
    $year: Int
    $price: Int
    $country: String
    $region: String
    $about: String
    $size: String
    $color: String
    $wheelSize: String
    $suspension: String
    $front: Int
    $rear: Int
    $upgrades: String
  ) {
    updateListing(
      bike_id: $bikeId
      make: $make
      model: $model
      year: $year
      price: $price
      country: $country
      region: $region
      about: $about
      size: $size
      color: $color
      wheel_size: $wheelSize
      suspension: $suspension
      front: $front
      rear: $rear
      upgrades: $upgrades
    ) {
      error
      message
      bike {
        bike_id
      }
    }
  }
`;

const UpdateBike = () => {
  const navigate = useNavigate();
  const { bike_id } = useParams();
  const [bikeForm, handleChange] = BikeMgmt();
  const [dbError, setDBError] = useState(false);

  const {
    loading: qloading,
    error: qerror,
    data: qdata,
  } = useQuery(BIKE_INFO, {
    variables: { bikeId: bike_id },
    onCompleted({ bike }) {
      if (bike.bike) {
        const formUpdate = {
          bikeId: bike_id,
          ...bikeForm,
          ...bike.bike,
          wheelSize: bike.bike.wheel_size,
        };
        handleChange(null, null, formUpdate);
      }
    },
  });

  const [updateListing, { loading, error }] = useMutation(UPDATE_BIKE, {
    onCompleted({ updateListing }) {
      if (loading) console.log("Loading.....");
      if (error) setDBError(error);
      if (updateListing.error) return setDBError(updateListing.message);
      if (!updateListing.error) navigate(`/bikes/${bike_id}`);
    },
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    updateListing({ variables: bikeForm });
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
          Update Bike
        </Heading>
        <BikeForm
          BtnName={"Update Bike"}
          handleSumbit={handleSumbit}
          form={bikeForm}
          handleChange={handleChange}
        />
        <Button
          colorScheme="orange"
          onClick={() => navigate(`/bikes/${bike_id}/edit/photos`)}
          mt="2"
          isFullWidth
        >
          Update Photos
        </Button>
      </UserOnly>
    </Container>
  );
};

export { BIKE_INFO };

export default UpdateBike;
