import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="hero">
        <Link to="/bikes">All Bikes</Link>
      </div>
      {/* pass search term in query */}
      <div className="search">
        <Link to="/bikes/search">Search Bikes</Link>
      </div>
      <div className="list bike">
        <Link to="/bikes/new">List My Bike</Link>
      </div>
      <div className="general">
        <Link to="/about">Learn More</Link>
      </div>
      <div className="action">
        <Link to="/bikes">Find a Bike</Link>
        <Link to="/bikes/new">List My Bike</Link>
      </div>
    </>
  );
};

export default Home;
