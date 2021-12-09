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
import QueryResults from "./QueryResults";
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";

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

const NavBar = ({ refetch }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { loading, error, data } = useQuery(CACHED_USER);

  return (
    <Flex>
      {/* LOGO */}
      <Box p="2">
        <Heading size="md" display={mdAbove} color="orange">
          <Link onClick={() => refetch()} to="/">
            Knobby Bike Exchange
          </Link>
        </Heading>
        <Heading size="md" display={smBelow}>
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
          <Button mr="4" variant="ghost" display={mdAbove} colorScheme="orange">
            <Link
              onClick={() => refetch()}
              to={`/user/${data.authUser.user?.email}`}
            >
              Hi, {data.authUser.user?.first_name}
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
              {data?.user ? (
                <MenuItem>
                  <Link to={`/user/${data.user?.email}`}>
                    Hi, {data.user?.first_name}
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
