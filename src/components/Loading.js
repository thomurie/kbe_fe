import { Spinner, Center } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="white"
        color="orange"
        size="xl"
      />
    </Center>
  );
};

export default Loading;
