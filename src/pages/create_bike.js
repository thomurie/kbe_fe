import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import BikeForm from "../components/bike_form";
import BikeMgmt from "../hooks/bikeMgmt";

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
      bike_id
    }
  }
`;

const CreateBike = () => {
  const navigate = useNavigate();
  const [bikeForm, handleChange] = BikeMgmt();

  const [createListing, { loading, error, data }] = useMutation(CREATE_BIKE, {
    onCompleted({ createListing }) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      navigate(`/bikes/${createListing.bike_id}`);
    },
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    createListing({ variables: form });
  };

  return (
    <BikeForm
      BtnName={"Add Bike"}
      handleSumbit={handleSumbit}
      form={bikeForm}
      handleChange={handleChange}
    />
  );
};

export default CreateBike;
