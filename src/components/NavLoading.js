// Components wrapped in this component rely on the results
// from a graphql query 

// Displays nothing while determining if a user is cached
const NavLoading = ({ loading, children }) => {
  if (loading) return null;

  return children;
};

export default NavLoading;
