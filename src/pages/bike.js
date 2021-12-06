import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, currentUser } from "../features/user/userSlice";
import QueryResult from "../components/query_results";
import BikePage from "../components/bike_page";
import { useEffect, useState } from "react";
import { Alert, AlertIcon } from "@chakra-ui/alert";

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

const Bike = () => {
  let { bike_id } = useParams();
  const [dbError, setDBError] = useState(false);

  const { loading, error, data, refetch } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <h1>This is the Bike</h1>
      <QueryResult
        error={error}
        loading={loading}
        data={data}
        setError={setDBError}
      >
        {dbError ? (
          <Alert status="error">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : (
          <BikePage bike={data?.bike} />
        )}
      </QueryResult>
    </>
  );
};

export default Bike;

// isFav={isFav}
