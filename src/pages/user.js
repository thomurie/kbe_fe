import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../features/user/userSlice";
import QueryResult from "../components/query_results";
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
    }
  }
`;

const DESTROY_USER = gql`
  mutation Mutation($email: String!, $confirmation: Boolean!) {
    deleteUser(email: $email, confirmation: $confirmation) {
      error
      message
    }
  }
`;

const User = ({ authUser }) => {
  let { user_id } = useParams();

  const [deleteUser, { loading: mloading, error: merror, data: mdata }] =
    useMutation(DESTROY_USER, {
      onCompleted(mdata) {
        if (mloading) console.log("Loading.....");
        if (merror) console.log(error);
      },
    });

  const { loading, error, data, refetch } = useQuery(USER, {
    variables: { email: user_id },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <UserProfile
        user={data?.user}
        authUser={authUser}
        deleteUser={deleteUser}
      />
    </QueryResult>
  );
};

export default User;
