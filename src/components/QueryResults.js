// EXTERNAL IMPORTS
import Loading from "./Loading";

// Components wrapped in this component rely on the results
// from a graphql query
const QueryResults = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: here {error}</p>;
  }
  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default QueryResults;
