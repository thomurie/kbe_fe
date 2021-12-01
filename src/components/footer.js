import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../features/user/userSlice";

const Footer = ({ refetch }) => {
  const cuser = useSelector(currentUser);
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/bikes">All Bikes</Link>
      <Link to="/about">Knobby Bike Exchange</Link>
      {cuser.email ? (
        <>
          <Link onClick={() => refetch()} to={`/user/${cuser.email}`}>
            {cuser.first_name} {cuser.last_name}.
          </Link>
        </>
      ) : (
        <>
          <Link to="/user/signup">Sign Up</Link>
          <Link to="/user/signin">Sign In</Link>
        </>
      )}
      <Link to="/bikes/new">List My Bike</Link>
    </>
  );
};

export default Footer;
