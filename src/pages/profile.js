import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../features/user/userSlice";
import QueryResult from "../components/query_results";
import UserPage from "../components/user_page";
import UserProfile from "../components/user_profile";

const USER = gql`
  query Query($email: String!) {
    user(email: $email) {
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
      }
      favorites {
        bike_id
        make
        model
        year
        price
        country
        region
      }
    }
  }
`;

const Profile = () => {
  let { user_id } = useParams();
  const { loading, error, data, refetch } = useQuery(USER, {
    variables: { email: user_id },
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <UserProfile data={data?.user} />
    </QueryResult>
  );
};

export default Profile;
