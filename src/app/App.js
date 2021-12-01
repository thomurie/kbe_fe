import React from "react";
import Navagation from "../components/navagation";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import Footer from "../components/footer";
import NavBar from "../components/nav";

const AUTH_USER = gql`
  query Query {
    authUser {
      email
      first_name
      last_name
      country
      region
      listings {
        bike_id
      }
      favorites {
        bike_id
      }
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(AUTH_USER, {
    onCompleted(data) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      if (data) {
        dispatch(addUser(data.authUser));
      }
    },
  });
  return (
    <div className="App">
      <NavBar refetch={refetch} />
      <Navagation />
      <Footer refetch={refetch} />
    </div>
  );
}

export default App;
