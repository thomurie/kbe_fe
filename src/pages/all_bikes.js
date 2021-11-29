import { useQuery, gql } from "@apollo/client";
import BikeCard from "../components/bike_card";
import QueryResult from "../components/query_results";

const ALLBIKES = gql`
  query Bikes {
    bikes {
      bike_id
      make
      model
      year
      price
      country
      region
    }
  }
`;

const AllBikes = () => {
  const { loading, error, data } = useQuery(ALLBIKES);

  console.log(data);
  return (
    <>
      <h1>This is All the Bikes</h1>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.bikes.map((bike) => (
          <BikeCard data={bike} />
        ))}
      </QueryResult>
    </>
  );
};

export default AllBikes;
