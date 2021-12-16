// EXTERNAL IMPORTS
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

// LOCAL IMPORTS
import UserProfile from "../components/UserProfile";
import UserLoading from "../components/UserLoading";

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
  const [deleteUser] = useMutation(DESTROY_USER, {
    onCompleted({ deleteUser }) {
      if (deleteUser) {
        if (deleteUser.error) return setDBError(deleteUser.message);
        localStorage.removeItem("token");
        un();
        navigate("/");
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {dbError ? (
        <Alert status="error">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      <UserLoading error={error} loading={loading} data={data}>
        <UserProfile user={data?.user} deleteUser={deleteUser} un={un} />
      </UserLoading>
    </>
  );
};
export { USER };
export default User;
