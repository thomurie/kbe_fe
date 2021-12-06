import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import BikeForm from "../components/bike_form";
import BikeMgmt from "../hooks/bikeMgmt";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import UserOnly from "../components/user_only";
import { useState } from "react";

const AUTH_USER = gql`
  query Query {
    authUser {
      error
      message
      token
      user {
        email
        first_name
        last_name
        country
        region
        listings {
          bike_id
        }
        favorites {
          bike_id
        }
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
    refetch,
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

  const [createListing, { loading, error, data }] = useMutation(CREATE_BIKE, {
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
    <>
      <UserOnly data={qdata} error={qerror} loading={qloading}>
        {dbError ? (
          <Alert status="error">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}
        <BikeForm
          BtnName={"Add Bike"}
          handleSumbit={handleSumbit}
          form={bikeForm}
          handleChange={handleChange}
        />
      </UserOnly>
    </>
  );
};

export default CreateBike;
