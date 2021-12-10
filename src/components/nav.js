// EXTERNAL IMPORTS
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Heading,
  IconButton,
  useColorMode,
  Flex,
  Spacer,
  VisuallyHidden,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
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

// NavBar COMPONENT
const NavBar = () => {
  // STATE
  const { colorMode, toggleColorMode } = useColorMode();
  // APOLLO GQL QUERY - identies if the there is an active token in the
  // browser
  const { loading, error, data, refetch } = useQuery(CACHED_USER);

  return (
    <Flex>
      {/* LOGO */}
      <Box p="2">
        <Heading size="md" display={mdAbove} color="orange">
          <Link onClick={() => refetch()} to="/">
            Knobby Bike Exchange
          </Link>
        </Heading>
        <Heading size="md" display={smBelow} color="orange">
          <Link onClick={() => refetch()} to="/">
            K.B.E.
          </Link>
        </Heading>
      </Box>
      <Spacer />
      {/* MENU-Desktop */}
      <Button display={mdAbove} mr="4" variant="ghost">
        <Link onClick={() => refetch()} to="/bikes">
          All Bikes
        </Link>
      </Button>
      <QueryResults loading={loading} error={error} data={data}>
        {data?.authUser.user?.email ? (
          <Button
            mr="4"
            variant="ghost"
            display={mdAbove}
            colorScheme="orange"
            textTransform={"capitalize"}
          >
            <Link
              onClick={() => refetch()}
              to={`/user/${data.authUser.user?.email}`}
            >
              Hi, {data.authUser.user?.first_name.substring(0, 12)}
            </Link>
          </Button>
        ) : (
          <>
            <Button mr="4" variant="ghost" display={mdAbove}>
              <Link onClick={() => refetch()} to="/user/signin">
                Sign In
              </Link>
            </Button>
            <Button
              mr="4"
              variant="ghost"
              display={mdAbove}
              colorScheme="orange"
            >
              <Link onClick={() => refetch()} to="/user/signup">
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </QueryResults>
      {/* MENU-Mobile*/}
      <Button onClick={toggleColorMode} mr="4" variant="ghost">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        <VisuallyHidden>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </VisuallyHidden>
      </Button>
      <Box>
        <Menu>
          <MenuButton
            display={smBelow}
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            mr="4"
            variant="ghost"
          />
          <MenuList>
            <MenuItem>
              <Link to="/bikes">All Bikes</Link>
            </MenuItem>
            <QueryResults loading={loading} error={error} data={data}>
              {data?.authUser.user?.email ? (
                <MenuItem textTransform={"capitalize"}>
                  <Link to={`/user/${data.authUser.user?.email}`}>
                    Hi, {data.authUser.user?.first_name.substring(0, 12)}
                  </Link>
                </MenuItem>
              ) : (
                <>
                  <MenuItem>
                    <Link onClick={() => refetch()} to="/user/signin">
                      Sign In
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link onClick={() => refetch()} to="/user/signup">
                      Sign Up
                    </Link>
                  </MenuItem>
                </>
              )}
            </QueryResults>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default NavBar;
