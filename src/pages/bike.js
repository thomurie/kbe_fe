import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, currentUser } from "../features/user/userSlice";
import QueryResult from "../components/query_results";
import BikePage from "../components/bike_page";

const BIKE = gql`
  query Query($bikeId: ID!) {
    bike(bike_id: $bikeId) {
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

const Bike = () => {
  const cuser = useSelector(currentUser);
  let { bike_id } = useParams();

  let typeUser = false;
  if (cuser.email) typeUser = "auth";
  if (cuser.listings?.find((b) => b === bike_id)) typeUser = "owner";

  const isFav = Boolean(cuser.favorites?.find((b) => b === bike_id));

  const { loading, error, data, refetch } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
  });

  refetch();
  return (
    <>
      <h1>This is the Bike</h1>
      <QueryResult error={error} loading={loading} data={data}>
        <BikePage bike={data?.bike} typeUser={typeUser} isFav={isFav} />
      </QueryResult>
    </>
  );
};

export default Bike;
