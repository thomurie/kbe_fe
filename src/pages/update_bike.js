import { useMutation, useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import BikeForm from "../components/bike_form";
import BikeMgmt from "../hooks/bikeMgmt";

const BIKE = gql`
  query Query($bikeId: ID!) {
    bike(bike_id: $bikeId) {
      user_id {
        email
        first_name
        last_name
      }
      make
      model
      year
      price
      country
      region
      size
      about
      color
      wheel_size
      suspension
      front
      rear
      upgrades
      is_active
      createdat
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
      bike_id
    }
  }
`;

const UpdateBike = () => {
  const navigate = useNavigate();
  const { bike_id } = useParams();
  const [bikeForm, handleChange] = BikeMgmt();

  const [updateListing, { loading, error, data }] = useMutation(UPDATE_BIKE, {
    onCompleted({ updateListing }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      navigate(`/bikes/${updateListing.bike_id}`);
    },
  });

  const { qloading, qerror, qdata } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
    onCompleted({ bike }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      const formUpdate = {
        bikeId: bike_id,
        ...bikeForm,
        ...bike,
        wheelSize: bike.wheel_size,
      };
      handleChange(null, null, formUpdate);
    },
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    updateListing({ variables: bikeForm });
  };

  return (
    <BikeForm
      BtnName={"Update Bike"}
      handleSumbit={handleSumbit}
      form={bikeForm}
      handleChange={handleChange}
    />
  );
};

export default UpdateBike;
