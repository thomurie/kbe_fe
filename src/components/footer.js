// EXTERNAL IMPORTS
import { Link } from "react-router-dom";
import { Box, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { FaHome, FaBicycle, FaUserCircle, FaSignInAlt } from "react-icons/fa";
// LOCAL IMPORTS
import QueryResults from "./QueryResults";
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";

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

// FOOTER COMPONENT
const Footer = () => {
  // APOLLO GQL QUERY - identies if the there is an active token in the
  const { loading, error, data, refetch } = useQuery(CACHED_USER);
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{ base: "4", md: "8" }}
    >
      <Flex>
        <Spacer />
        <Box display={mdAbove}>
          <Link to="/">Home</Link>
        </Box>
        <Box display={smBelow}>
          <Link to="/">
            <IconButton aria-label="Home" icon={<FaHome />} />
          </Link>
        </Box>
        <Spacer />
        <Box display={mdAbove}>
          <Link to="/bikes">All Bikes</Link>
        </Box>
        <Box display={smBelow}>
          <Link to="/bikes">
            <IconButton aria-label="All Bikes" icon={<FaBicycle />} />
          </Link>
        </Box>
        <Spacer />
        <Box display={mdAbove}>
          <Link to="/">Knobby Bike Exchange</Link>
        </Box>
        <Spacer display={mdAbove} />
        <QueryResults loading={loading} error={error} data={data}>
          {data?.authUser.user?.email ? (
            <>
              <Box display={mdAbove}>
                <Link
                  onClick={() => refetch()}
                  to={`/user/${data.authUser.user?.email}`}
                >
                  View Profile
                </Link>
              </Box>
              <Box display={smBelow}>
                <Link
                  onClick={() => refetch()}
                  to={`/user/${data.authUser.user?.email}`}
                >
                  <IconButton
                    aria-label="View Profile"
                    icon={<FaUserCircle />}
                  />
                </Link>
              </Box>
              <Spacer display={mdAbove} />
              <Box display={mdAbove}>
                <Link to="/bikes/new">List My Bike</Link>
              </Box>
            </>
          ) : (
            <>
              <Box display={mdAbove}>
                <Link to="/user/signin">Sign In</Link>
              </Box>
              <Box display={smBelow}>
                <Link to="/user/signin" onClick={() => refetch()}>
                  <IconButton
                    aria-label="Search database"
                    icon={<FaSignInAlt />}
                  />
                </Link>
              </Box>
              <Spacer display={mdAbove} />
              <Box display={mdAbove}>
                <Link onClick={() => refetch()} to="/user/signup">
                  Sign Up
                </Link>
              </Box>
            </>
          )}
        </QueryResults>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default Footer;
