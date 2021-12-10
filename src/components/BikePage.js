// EXTERNAL IMPORTS
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  AspectRatio,
  Container,
  Flex,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Table,
  TableCaption,
  Tbody,
  Spacer,
  Stack,
  Heading,
  Tr,
  Td,
  Image,
  Center,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { CopyToClipboard } from "react-copy-to-clipboard";
// LOCAL IMPORTS
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";
// CONFIG
const URL = process.env.REACT_BASE_URL || "http://localhost:3000/bikes/";

// APOLLO GQL MUTATIONS
const DESTROY_BIKE = gql`
  mutation DeleteListing($bikeId: ID!, $confirmation: Boolean!) {
    deleteListing(bike_id: $bikeId, confirmation: $confirmation) {
      error
      message
    }
  }
`;

const ADD_FAV = gql`
  mutation Mutation($bikeId: String!) {
    createFavorite(bike_id: $bikeId) {
      error
      message
    }
  }
`;

const DESTROY_FAV = gql`
  mutation Mutation($bikeId: String!) {
    deleteFavorite(bike_id: $bikeId) {
      error
      message
    }
  }
`;

// BIKE COMPONENT
function BikePage({ bike }) {
  // CONFIG
  const navigate = useNavigate();
  const { message } = bike;
  const {
    bike_id,
    user_id,
    make,
    model,
    year,
    price,
    region,
    country,
    about,
    size,
    color,
    wheel_size,
    suspension,
    front,
    rear,
    upgrades,
    photos,
  } = bike.bike;
  // STATE
  const [copied, setCopied] = useState(false);
  const [fav, setFav] = useState(message === "fav" ? "Unfavorite" : "Favorite");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // ADDITIONAL CONFIG
  const photo =
    photos.length > 0 ? photos[0].url : "https://via.placeholder.com/150";

  // APOLLO GQL MUTATIONS
  // Removes bike from database
  const [deleteListing, { loading, error }] = useMutation(DESTROY_BIKE, {
    onCompleted(data) {
      if (loading) console.log("Loading.....");
      if (error) console.log(error);
      if (data) navigate(`/user/${user_id.email}`);
    },
  });
  // Creates a favorite
  const [createFavorite] = useMutation(ADD_FAV);
  // Destroys a favorite
  const [deleteFavorite] = useMutation(DESTROY_FAV);

  // EVENT HANDLERS
  // handles favoriting a bike
  const favClick = () => {
    if (fav === "Favorite") {
      setFav("Unfavorite");
      createFavorite({ variables: { bikeId: bike_id } });
    } else if (fav === "Unfavorite") {
      setFav("Favorite");
      deleteFavorite({ variables: { bikeId: bike_id } });
    }
  };
  // handles unfavoriting a bike
  const destroyClick = () => {
    deleteListing({
      variables: { bikeId: bike_id, confirmation: true },
    });
    navigate("/");
  };
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
            {/* Share */}
            <CopyToClipboard
              text={`${URL}${bike_id}`}
              onCopy={() => setCopied(true)}
              mb="2"
            >
              <Button colorScheme="orange" isFullWidth>
                {copied ? "Copied" : "Share Bike"}
              </Button>
            </CopyToClipboard>

            {bike.owner ? (
              <>
                {/* Edit */}
                <Button
                  colorScheme="orange"
                  onClick={() => navigate(`/bikes/${bike_id}/edit`)}
                  mb="2"
                  isFullWidth
                >
                  Edit Bike
                </Button>
                {/* Delete */}
                <Button
                  colorScheme="orange"
                  onClick={onOpen}
                  mb="2"
                  isFullWidth
                >
                  Delete Bike
                </Button>
              </>
            ) : message ? (
              <>
                <Button
                  colorScheme="orange"
                  onClick={() => navigate(`/user/${user_id.email}`)}
                  isFullWidth
                  mb="2"
                >
                  Contact Seller
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={favClick}
                  mb="2"
                  isFullWidth
                >
                  {fav} Bike
                </Button>
              </>
            ) : (
              <Button
                colorScheme="orange"
                onClick={() => navigate(`/user/${user_id.email}`)}
                mb="4"
                isFullWidth
              >
                Contact Seller
              </Button>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box p="2">
        <Flex>
          <Button
            colorScheme="orange"
            onClick={() => navigate("/bikes")}
            display={mdAbove}
            mr="4"
          >
            Back to Results
          </Button>

          <CopyToClipboard
            text={`${URL}${bike_id}`}
            onCopy={() => setCopied(true)}
            display={mdAbove}
            mr="4"
          >
            <Button display={mdAbove} colorScheme="orange">
              {copied ? "Copied" : "Share Bike"}
            </Button>
          </CopyToClipboard>
          <Spacer />
          {bike.owner ? (
            <>
              {/* Edit */}
              <Button
                colorScheme="orange"
                onClick={() => navigate(`/bikes/${bike_id}/edit`)}
                mr="4"
                display={mdAbove}
              >
                Edit Bike
              </Button>
              {/* Delete */}
              <Button colorScheme="orange" onClick={onOpen} display={mdAbove}>
                Delete Bike
              </Button>
            </>
          ) : message ? (
            <>
              <Button
                colorScheme="orange"
                display={mdAbove}
                onClick={() => navigate(`/user/${user_id.email}`)}
                mr="2"
              >
                Contact Seller
              </Button>
              <Button colorScheme="orange" onClick={favClick} display={mdAbove}>
                {fav} Bike
              </Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="orange"
                onClick={() => navigate(`/user/${user_id.email}`)}
                display={mdAbove}
              >
                Contact Seller
              </Button>
            </>
          )}
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Bike Removal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="Lg">This Acition is irreversible</Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={destroyClick}>
              Delete Bike
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          <AspectRatio ratio={4 / 3}>
            <Image src={photo} size="40%" rounded="1rem" shadow="2xl" />
          </AspectRatio>
        </Box>
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
            style={{ textTransform: "capitalize" }}
          >
            {make}
            <br />
            {model}
          </Heading>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            {year} | {country} | {region}
          </Heading>
          <Stat>
            <StatLabel>Asking Price</StatLabel>
            <StatNumber>${price}</StatNumber>
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
          <Text fontSize="sm">{about || "Nothing Details Provided."}</Text>
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
        <Table variant="simple" colorScheme="orange">
          <TableCaption>User input data | Not verified</TableCaption>
          <Tbody>
            <Tr>
              <Td>Size</Td>
              <Td>{size}</Td>
            </Tr>
            <Tr>
              <Td>Color</Td>
              <Td>{color}</Td>
            </Tr>
            <Tr>
              <Td>Wheel Size</Td>
              <Td>{wheel_size}</Td>
            </Tr>
            <Tr>
              <Td>Suspension Type</Td>
              <Td>{suspension}</Td>
            </Tr>
            <Tr>
              <Td>Front Travel</Td>
              <Td>{front} mm</Td>
            </Tr>
            <Tr>
              <Td>Rear Travel</Td>
              <Td>{rear} mm</Td>
            </Tr>
          </Tbody>
        </Table>
      </Container>

      <Box mb="6" mt="4">
        <Center>
          <Heading fontSize="xl" Box mb="1">
            Upgrades
          </Heading>
        </Center>
        <Container maxW="container.lg">
          <Divider />
          <Text fontSize="sm" mt="2">
            {upgrades || "Nothing Details Provided."}
          </Text>
        </Container>
      </Box>
    </Container>
  );
}

export default BikePage;
