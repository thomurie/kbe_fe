import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import QueryResult from "../components/QueryResults";
import BikePage from "../components/BikePage";
import { useEffect, useState } from "react";
import { Alert, AlertIcon, Center, Button, IconButton } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";

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
  const navigate = useNavigate();
  let { bike_id } = useParams();
  const [dbError, setDBError] = useState(false);

  const { loading, error, data, refetch } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
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
        ) : data?.bike.error ? (
          <>
            <Alert status="error" mb="4">
              <AlertIcon />
              {data.bike.message}
            </Alert>
            <Center>
              <Button display={mdAbove} onClick={() => navigate(`/`)}>
                Return to Home
              </Button>
              <Button display={smBelow}>
                <IconButton
                  aria-label="Home"
                  icon={<FaHome />}
                  onClick={() => navigate(`/`)}
                />
              </Button>
            </Center>
          </>
        ) : (
          <BikePage bike={data?.bike} />
        )}
      </QueryResult>
    </>
  );
};

export { BIKE };

export default Bike;
