// EXTERNAL IMPORTS
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, Heading, Container, Button } from "@chakra-ui/react";

// LOCAL IMPORTS
import BikeForm from "../components/BikeForm";
import BikeMgmt from "../hooks/bikeMgmt";
import UserOnly from "../components/UserOnly";
import bikeFormHelper from "../helpers/bikeFormHelper";

// APOLLO GQL QUERIES
const AUTH_USER = gql`
  query Query {
    authUser {
      error
      message
      user {
        country
        region
      }
    }
  }
`;

// APOLLO GQL MUTATIONS
const CREATE_BIKE = gql`
  mutation Mutation(
    $make: String!
    $model: String!
    $year: Int!
    $price: Int!
    $country: String!
    $region: String!
    $about: String
    $size: String
    $color: String
    $wheelSize: String
    $suspension: String
    $front: Int
    $rear: Int
    $upgrades: String
  ) {
    createListing(
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
      owner
      bike {
        bike_id
      }
    }
  }
`;

// CREATEBIKE COMPONENT
const CreateBike = () => {
  // CONFIG
  const navigate = useNavigate();

  //STATE
  const [bikeForm, handleChange] = BikeMgmt();
  const [dbError, setDBError] = useState(false);

  // APOLLO GQL QUERY - Validate that there is an authenticated user
  const {
    loading: qloading,
    error: qerror,
    data: qdata,
  } = useQuery(AUTH_USER, {
    onCompleted({ authUser }) {
      if (authUser.user) {
        const formUpdate = {
          ...bikeForm,
          country: authUser.user.country,
          region: authUser.user.region,
        };
        handleChange(null, null, formUpdate);
      }
    },
  });

  // APOLLO GQL MUTATION - Create a new bike
  const [createListing, { loading, error }] = useMutation(CREATE_BIKE, {
    onCompleted({ createListing }) {
      if (loading) console.log("Loading.....");
      if (error) setDBError(error);
      if (createListing)
        navigate(`/bikes/${createListing.bike.bike_id}/edit/photos?q=add`);
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
    createListing({ variables: bikeForm });
  };

  return (
    <Container maxW="xl">
      <UserOnly data={qdata} error={qerror} loading={qloading}>
        {/* TITLE */}
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
          mb="4"
        >
          Add a New Bike
        </Heading>
        {/* ERROR HANDLER */}
        {dbError ? (
          <Alert status="error" mb="4">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}
        {/* FORM */}
        <BikeForm
          BtnName={"Next"}
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

export { AUTH_USER };
export default CreateBike;
