import { Spinner } from "@chakra-ui/react";

const QueryResults = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: here {error}</p>;
  }
  if (loading) {
    return <Spinner size="sm" />;
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default QueryResults;
