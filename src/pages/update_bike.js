import { useMutation, useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import BikeForm from "../components/bike_form";
import BikeMgmt from "../hooks/bikeMgmt";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useState, useEffect } from "react";
import UserOnly from "../components/user_only";
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const BIKE = gql`
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
    refetch,
  } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
    onCompleted({ bike }) {
      console.log(bike);
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

  const [updateListing, { loading, error, data }] = useMutation(UPDATE_BIKE, {
    onCompleted({ updateListing }) {
      console.log(updateListing);
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
    <UserOnly data={qdata} error={qerror} loading={qloading}>
      {dbError ? (
        <Alert status="error">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      <Button
        colorScheme="blue"
        onClick={() => navigate(`/bikes/${bike_id}/edit/photos`)}
      >
        Update Photos
      </Button>
      <BikeForm
        BtnName={"Update Bike"}
        handleSumbit={handleSumbit}
        form={bikeForm}
        handleChange={handleChange}
      />
    </UserOnly>
  );
};

export default UpdateBike;
