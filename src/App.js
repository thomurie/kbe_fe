// EXTERNAL IMPORTS
import { Routes, Route } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// LOCAL IMPORTS
import AllBikes from "./pages/AllBikes";
import Bike from "./pages/Bike";
import CreateBike from "./pages/CreateBike";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdateBike from "./pages/UpdateBike";
import User from "./pages/User";
import PageNotFound from "./pages/PageNotFound";
import UpdateUser from "./pages/UpdateUser";
import ManagePhotos from "./pages/ManagePhotos";
import Footer from "./components/Footer";
import NavBar from "./components/Nav";

// APOLLO GQL QUERIES
const CACHED_USER = gql`
  query Query {
    authUser {
      error
      user {
        email
        first_name
        last_name
      }
    }
  }
`;

// APP COMPONENT
const App = () => {
  // APOLLO GQL QUERY - identies if the there is an active token in the
  // browser
  const { refetch } = useQuery(CACHED_USER);

  return (
    <div className="App">
      <NavBar refetch={refetch} />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<AllBikes />} />
        {/* PUBLIC, UNIQUE TO AUTH */}
        <Route path="/bikes/:bike_id" element={<Bike />} />
        <Route path="/user/:user_id" element={<User un={refetch} />} />
        {/* PUBLIC !USER */}
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        {/* USER */}
        <Route path="/bikes/new" element={<CreateBike />} />
        {/* AUTH */}
        <Route path="/bikes/:bike_id/edit/photos" element={<ManagePhotos />} />
        <Route path="/bikes/:bike_id/edit" element={<UpdateBike />} />
        <Route path="/user/:user_id/edit" element={<UpdateUser />} />
        {/* NONEXISTANT ROUTE */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export { CACHED_USER };
export default App;
