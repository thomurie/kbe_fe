// EXTERNAL IMPORTS
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Alert, AlertIcon, Box, IconButton } from "@chakra-ui/react";

// LOCAL IMPORTS
import QueryResult from "../components/QueryResults";
import UserProfile from "../components/UserProfile";
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";

// APOLLO GQL QUERIES
const USER = gql`
  query Query($email: String!) {
    user(email: $email) {
      error
      owner
      message
      user {
        email
        first_name
        last_name
        country
        region
        phone
        sms
        bio
        listings {
          bike_id
          make
          model
          year
          price
          country
          region
          photos {
            url
          }
        }
        favorites {
          bike_id
          make
          model
          year
          price
          country
          region
          photos {
            url
          }
        }
      }
    }
  }
`;

// APOLLO GQL MUTATIONS
const DESTROY_USER = gql`
  mutation Mutation($email: String!, $confirmation: Boolean!) {
    deleteUser(email: $email, confirmation: $confirmation) {
      error
      message
    }
  }
`;

// USER COMPONENT
const User = ({ un }) => {
  // CONFIG
  const navigate = useNavigate();
  let { user_id } = useParams();

  // STATE
  const [dbError, setDBError] = useState(false);

  // APOLLO GQL QUERIES
  const { loading, error, data, refetch } = useQuery(USER, {
    variables: { email: user_id },
  });

  // APOLLO GQL MUTATIONS
  const [deleteUser, { loading: mloading, error: merror }] = useMutation(
    DESTROY_USER,
    {
      onCompleted({ deleteUser }) {
        if (mloading) console.log("Loading.....");
        if (merror) setDBError(merror);
        if (deleteUser) {
          localStorage.removeItem("token");
          un();
        }
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <QueryResult error={error} loading={loading} data={data}>
      {/* ERROR HANDLING */}
      {dbError ? (
        <>
          <Alert status="error">
            <AlertIcon />
            {dbError}
          </Alert>
          <Box display={mdAbove} onClick={() => navigate(`/`)}>
            Home
          </Box>
          <Box display={smBelow}>
            <IconButton
              aria-label="Home"
              icon={<FaHome />}
              onClick={() => navigate(`/`)}
            />
          </Box>
        </>
      ) : (
        // USER DATA
        <UserProfile user={data?.user} deleteUser={deleteUser} un={un} />
      )}
    </QueryResult>
  );
};
export { USER };
export default User;
