import UserPage from "../components/user_page";

const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default QueryResult;
