// EXTERNAL IMPORTS
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// LOCAL IMPORTS
import BikePage from "../components/BikePage";
import BikeLoading from "../components/BikeLoading";

// APOLLO GQL QUERIES
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
        photos {
          url
        }
      }
    }
  }
`;

// BIKE COMPONENT
const Bike = () => {
  // CONFIG
  let { bike_id } = useParams();

  // APOLLO GQL QUERY - Retrieves bike data
  const { loading, error, data, refetch } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
  });
  // Fetches new Bike data on Re-render
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <BikeLoading error={error} loading={loading} data={data}>
      <BikePage bike={data?.bike} />
    </BikeLoading>
  );
};

export { BIKE };

export default Bike;
