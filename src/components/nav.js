// EXTERNAL IMPORTS
import { Link, useNavigate } from "react-router-dom";
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
import NavLoading from "./NavLoading";
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
  const { loading, data } = useQuery(CACHED_USER);

  const navigate = useNavigate();
  return (
    <Flex>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
      </style>
      {/* LOGO */}
      <Box p="2">
        <Heading
          size="md"
          display={mdAbove}
          color="orange"
          ml="4"
          fontFamily={"Permanent Marker, cursive"}
        >
          <Link to="/">Knobby Bike Exchange</Link>
        </Heading>
        <Heading
          size="md"
          display={smBelow}
          color="orange"
          ml="4"
          fontFamily={"Permanent Marker, cursive"}
        >
          <Link to="/">K.B.E.</Link>
        </Heading>
      </Box>
      <Spacer />
      {/* MENU-Desktop */}
      <NavLoading loading={loading}>
        {data?.authUser.user?.email ? (
          <Button
            mr="4"
            variant="ghost"
            display={mdAbove}
            colorScheme="orange"
            textTransform={"capitalize"}
            onClick={() => navigate(`/user/${data.authUser.user?.email}`)}
          >
            Hi, {data.authUser.user?.first_name.substring(0, 12)}
          </Button>
        ) : (
          <>
            <Button
              mr="4"
              variant="ghost"
              display={mdAbove}
              onClick={() => navigate("/user/signin")}
            >
              Sign In
            </Button>
            <Button
              mr="4"
              variant="ghost"
              display={mdAbove}
              colorScheme="orange"
              onClick={() => navigate("/user/signup")}
            >
              Sign Up
            </Button>
          </>
        )}
      </NavLoading>
      <Button
        display={mdAbove}
        mr="4"
        variant="ghost"
        onClick={() => navigate("/bikes")}
      >
        All Bikes
      </Button>
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
            <NavLoading loading={loading}>
              {data?.authUser.user?.email ? (
                <MenuItem
                  textTransform={"capitalize"}
                  onClick={() => navigate(`/user/${data.authUser.user?.email}`)}
                >
                  Hi, {data.authUser.user?.first_name.substring(0, 12)}
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => navigate("/user/signin")}>
                    Sign In
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/user/signup")}>
                    Sign Up
                  </MenuItem>
                </>
              )}
            </NavLoading>
            <MenuItem onClick={() => navigate("/bikes")}>All Bikes</MenuItem>
            <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default NavBar;
