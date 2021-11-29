import { Link } from "react-router-dom";
import { Button, useColorMode } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../features/user/userSlice";
// modify for authenticated users.

const NavBar = ({ refetch }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const cuser = useSelector(currentUser);

  return (
    <>
      <Link onClick={() => refetch()} to="/bikes">
        All Bikes
      </Link>
      <Link onClick={() => refetch()} to="/">
        Knobby Bike Exchange
      </Link>
      {cuser.email ? (
        <>
          <Link onClick={() => refetch()} to={`/user/${cuser.email}/profile`}>
            {cuser.first_name} {cuser.last_name}.
          </Link>
        </>
      ) : (
        <>
          <Link onClick={() => refetch()} to="/user/signin">
            Sign In
          </Link>
        </>
      )}
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </>
  );
};

export default NavBar;
