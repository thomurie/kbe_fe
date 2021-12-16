// EXTERNAL IMPORTS
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

// SearchBar Component
const SearchBar = ({ setSearch, setPage }) => {
  // STATE
  const [show, setShow] = useState(true);
  const [formVal, setFormVal] = useState("");

  // EVENT HANDLERS
  // Handles changes to the form
  const handleChange = (e) => {
    const { value } = e.target;
    if (!show) setShow(true);
    setFormVal(value);
  };
  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifies that search term is !null
    if (formVal) {
      if (!show) {
        setShow(!show);
        setFormVal("");
        setSearch("");
      } else {
        setShow(!show);
        setSearch(formVal);
      }
      setPage(0);
    }
    return;
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md" mb="4" w="100%">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search by Make or Model"
          value={formVal}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            type="submit"
            h="1.75rem"
            size="sm"
            onClick={handleSubmit}
            variant="ghost"
          >
            {show ? "Search" : "Clear"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
