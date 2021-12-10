// EXTERNAL IMPORTS
import { useMutation, useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertIcon, Button, Container, Heading } from "@chakra-ui/react";

// LOCAL IMPORTS
import BikeForm from "../components/BikeForm";
import BikeMgmt from "../hooks/bikeMgmt";
import UserOnly from "../components/UserOnly";
import bikeFormHelper from "../helpers/bikeFormHelper";

// APOLLO GQL QUERIES
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

// APOLLO GQL MUTATIONS
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

// UPDATEBIKE COMPONENT
const UpdateBike = () => {
  // CONFIG
  const navigate = useNavigate();
  const { bike_id } = useParams();

  // STATE
  const [bikeForm, handleChange] = BikeMgmt();
  const [dbError, setDBError] = useState(false);

  // APOLLO GQL QUERIES
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

  // APOLLO GQL MUTATIONS
  const [updateListing, { loading, error }] = useMutation(UPDATE_BIKE, {
    onCompleted({ updateListing }) {
      if (loading) console.log("Loading.....");
      if (error) setDBError(error);
      if (updateListing.error) return setDBError(updateListing.message);
      if (!updateListing.error)
        navigate(`/bikes/${bike_id}/edit/photos?q=update`);
    },
  });

  // EVENT HANDLERS
  const handleSumbit = async (e) => {
    e.preventDefault();
    const validate = bikeFormHelper(bikeForm);
    if (validate) {
      setDBError(validate);
      return;
    }
    updateListing({ variables: bikeForm });
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
          Update Bike
        </Heading>
        {/* ERROR HANDLING */}
        {dbError ? (
          <Alert status="error" mb="4">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}
        {/* FORM */}
        <BikeForm
          BtnName={"Update Photos"}
          handleSumbit={handleSumbit}
          form={bikeForm}
          handleChange={handleChange}
        />
        {/* CANCEL */}
        <Button
          colorScheme="orange"
          onClick={() => navigate(`/`)}
          mt="2"
          isFullWidth
        >
          Cancel
        </Button>
      </UserOnly>
    </Container>
  );
};

export { BIKE_INFO };

export default UpdateBike;
