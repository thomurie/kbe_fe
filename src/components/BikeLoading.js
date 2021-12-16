// EXTERNAL IMPORTS
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AspectRatio,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Table,
  TableCaption,
  Tbody,
  Stack,
  Tr,
  Td,
  Image,
  Center,
  Divider,
  Box,
  Alert,
  AlertIcon,
  Spacer,
  Button,
  Container,
  Flex,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";

const BikePageSkeleton = () => {
  // CONFIG
  const navigate = useNavigate();
  return (
    <Container maxW="container.xl">
      <Accordion allowMultiple display={smBelow}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Actions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Button
              colorScheme="orange"
              onClick={() => navigate("/bikes")}
              mb="2"
              isFullWidth
            >
              Back to Results
            </Button>
            <Button isFullWidth disabled>
              Share Bike
            </Button>

            <Button mb="4" isFullWidth disabled>
              Contact Seller
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box p="4">
        <Flex>
          <Button
            colorScheme="orange"
            onClick={() => navigate("/bikes")}
            display={mdAbove}
            mr="4"
          >
            Back to Results
          </Button>

          <Button display={mdAbove} mr="4" disabled>
            Share Bike
          </Button>
          <Spacer />

          <Button display={mdAbove} disabled>
            Contact Seller
          </Button>
        </Flex>
      </Box>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
      >
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <Skeleton rounded="1rem" shadow="2xl">
            <AspectRatio ratio={4 / 3}>
              <Image size="40%" />
            </AspectRatio>
          </Skeleton>
        </Box>
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Skeleton>
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center", "left", "left"]}
              style={{ textTransform: "capitalize" }}
            >
              Loading
              <br />
              Loading
            </Heading>
          </Skeleton>
          <Skeleton>
            <Heading
              as="h2"
              size="md"
              color="orange"
              opacity="0.8"
              fontWeight="normal"
              lineHeight={1.5}
              textAlign={["center", "center", "left", "left"]}
            >
              Loading | Loading | Loading
            </Heading>
          </Skeleton>

          <Stat>
            <StatLabel>Asking Price</StatLabel>
            <Skeleton>
              <StatNumber>Loading</StatNumber>
            </Skeleton>
          </Stat>
        </Stack>
      </Flex>
      {/* // About */}

      <Box mb="6" mt="4">
        <Center>
          <Heading fontSize="xl" Box mb="1">
            About
          </Heading>
        </Center>
        <Container maxW="container.lg">
          <Divider />
          <Skeleton>
            <Text fontSize="sm">Loading</Text>
          </Skeleton>
        </Container>
      </Box>

      <Box mb="1">
        <Center>
          <Heading fontSize="xl">Specs</Heading>
        </Center>
      </Box>
      <Container maxW="container.lg">
        <Divider />
        {/* // SPECS */}
        <Skeleton>
          <Table variant="simple" colorScheme="orange">
            <TableCaption>User input data | Not verified</TableCaption>
            <Tbody>
              {new Array(6).fill(
                <Tr>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Skeleton>
      </Container>

      <Box mb="6" mt="4">
        <Center>
          <Heading fontSize="xl" Box mb="1">
            Upgrades
          </Heading>
        </Center>
        <Container maxW="container.lg">
          <Divider />
          <Skeleton>
            <Text fontSize="sm" mt="2">
              Loading
            </Text>
          </Skeleton>
        </Container>
      </Box>
    </Container>
  );
};

// Components wrapped in this component rely on the results
// from a graphql query
const BikeLoading = ({ loading, error, data, children }) => {
  console.log();
  if (error) {
    return (
      <Alert status="error" mb="4">
        <AlertIcon />
        {error?.message}
      </Alert>
    );
  }
  if (loading) {
    return BikePageSkeleton();
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default BikeLoading;
