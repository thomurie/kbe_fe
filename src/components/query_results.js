const QueryResult = ({ loading, error, data, children }) => {
  console.log(error, data);
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
