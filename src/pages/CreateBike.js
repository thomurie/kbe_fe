import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import BikeForm from "../components/BikeForm";
import BikeMgmt from "../hooks/bikeMgmt";
import { Alert, AlertIcon, Heading, Container } from "@chakra-ui/react";
import UserOnly from "../components/UserOnly";
import { useState } from "react";

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

const CreateBike = () => {
  const navigate = useNavigate();
  const [bikeForm, handleChange] = BikeMgmt();
  const [dbError, setDBError] = useState(false);

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

  const [createListing, { loading, error }] = useMutation(CREATE_BIKE, {
    onCompleted({ createListing }) {
      if (loading) console.log("Loading.....");
      if (error) setDBError(error);
      if (createListing) navigate(`/bikes/${createListing.bike.bike_id}`);
    },
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(bikeForm);
    createListing({ variables: bikeForm });
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
          Add a New Bike
        </Heading>
        <BikeForm
          BtnName={"Add Bike"}
          handleSumbit={handleSumbit}
          form={bikeForm}
          handleChange={handleChange}
        />
      </UserOnly>
    </Container>
  );
};

export { AUTH_USER };
export default CreateBike;
