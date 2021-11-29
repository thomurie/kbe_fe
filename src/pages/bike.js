import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, currentUser } from "../features/user/userSlice";
import { useState } from "react";
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

  const isOwner = Boolean(cuser.listings?.find((b) => b === bike_id));
  const isFav = Boolean(cuser.favorites?.find((b) => b === bike_id));

  // const ownerTest = cuser.listings?.find(b => b === bike_id);
  // const favTest = cuser.favorites?.find(b => b === bike_id);

  const { loading, error, data, refetch } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
  });
  console.log(isOwner, isFav);
  // console.log(ownerTest, favTest);
  refetch();
  return (
    <>
      <h1>This is the Bike</h1>
      <QueryResult error={error} loading={loading} data={data}>
        <BikePage data={data?.bike} isOwner={isOwner} isFav={isFav} />
      </QueryResult>
    </>
  );
};

export default Bike;
