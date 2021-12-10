// EXTERNAL IMPORTS
import {
  Alert,
  AlertIcon,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Flex,
  Button,
  Text,
  Spacer,
  Heading,
  IconButton,
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
import { FaHome } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
// LOCAL IMPORTS
import BikeCard from "./BikeCard";
import smBelow from "../assets/sm_below.json";
import mdAbove from "../assets/md_above.json";
import phoneHelper from "../helpers/phoneHelper";

// APOLLO GQL QUERIES
const UserProfile = ({ user, deleteUser, un }) => {
  // CONFIG
  const navigate = useNavigate();

  // STATE
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //INITAL ERROR HANDLING
  if (user.error || !user.user)
    return (
      <>
        <Alert status="error" mb="4">
          <AlertIcon />
          {user.message}
        </Alert>
        <Center>
          <Button display={mdAbove} onClick={() => navigate(`/`)}>
            Return to Home
          </Button>
          <IconButton
            display={smBelow}
            aria-label="Home"
            icon={<FaHome />}
            onClick={() => navigate(`/`)}
          />
        </Center>
      </>
    );

  // ADDITIONAL CONFIG
  const { message } = user;
  const {
    email,
    first_name,
    last_name,
    region,
    phone,
    country,
    bio,
    listings,
    favorites,
  } = user.user;

  // EVENT HANDLERS
  const signOut = () => {
    localStorage.removeItem("token");
    un();
    navigate("/");
  };
  const updateUser = () => {
    navigate(`/user/${email}/edit`);
  };
  const destroyClick = () => {
    deleteUser({ variables: { email: email, confirmation: true } });
    navigate("/");
  };
  const showPhone = () => {
    if (message) {
      setShow(!show);
    } else {
      navigate("/user/signin");
    }
  };

  return (
    <Container maxW="container.lg">
      {user.owner ? (
        <>
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
                  mb="2"
                  onClick={() => navigate("/bikes/new")}
                  isFullWidth
                >
                  Add New Bike
                </Button>
                {/* LogOut */}
                <Button
                  colorScheme="orange"
                  mb="2"
                  onClick={signOut}
                  isFullWidth
                >
                  Sign Out
                </Button>
                {/* Edit */}
                <Button
                  colorScheme="orange"
                  mb="2"
                  onClick={updateUser}
                  isFullWidth
                >
                  Edit Profile
                </Button>
                {/* Delete */}
                <Button
                  colorScheme="orange"
                  mb="2"
                  onClick={onOpen}
                  isFullWidth
                >
                  Delete Profile
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Box p="2" display={mdAbove}>
            <Flex>
              <Button
                colorScheme="orange"
                onClick={() => navigate("/bikes/new")}
              >
                Add New Bike
              </Button>
              {/* LogOut */}
              <Spacer />
              <Button colorScheme="orange" onClick={signOut} mr="4">
                Sign Out
              </Button>
              {/* Edit */}
              <Button colorScheme="orange" onClick={updateUser} mr="4">
                Edit Profile
              </Button>
              {/* Delete */}
              <Button colorScheme="orange" onClick={onOpen}>
                Delete Profile
              </Button>
            </Flex>
          </Box>
        </>
      ) : null}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Account Removal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="Lg">This Acition is irreversible</Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={destroyClick}>
              Delete Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* USER INFOR */}
      <Heading
        as="h1"
        size="xl"
        fontWeight="bold"
        color="primary.800"
        textAlign={["center", "center", "left", "left"]}
        style={{ textTransform: "capitalize" }}
      >
        {first_name} {last_name}.
      </Heading>
      <Heading
        as="h2"
        size="md"
        color="orange"
        opacity="0.8"
        fontWeight="normal"
        lineHeight={1.5}
        textAlign={["center", "center", "left", "left"]}
      >
        {country} | {region}
      </Heading>
      {/* About */}
      <Box mb="6" mt="4">
        <Center>
          <Heading fontSize="xl" Box mb="1">
            About
          </Heading>
        </Center>
        <Container maxW="container.lg">
          <Divider />
          <Text fontSize="sm" mt="2">
            {bio || "No Details Provided."}
          </Text>
        </Container>
      </Box>
      {user.owner ? (
        favorites.length > 0 ? (
          <Box mb="6" mt="4">
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center", "left", "left"]}
              mb="4"
            >
              Favorites
            </Heading>
            <SimpleGrid columns={[1, null, 3]} spacing="6" mb="4">
              {favorites.map((bike) => (
                <BikeCard data={bike} key={uuidv4()} />
              ))}
            </SimpleGrid>
          </Box>
        ) : null
      ) : show ? (
        <Center>
          <Button colorScheme="orange" onClick={showPhone}>
            {phoneHelper(phone)} | {email}
          </Button>
        </Center>
      ) : (
        <Center>
          <Button colorScheme="orange" onClick={showPhone}>
            Contact {first_name} {last_name}.
          </Button>
        </Center>
      )}
      {/* Listings */}
      {listings.length > 0 ? (
        <Box mb="6" mt="4">
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
            mb="4"
          >
            Listings
          </Heading>
          <SimpleGrid columns={[1, null, 3]} spacing="6" mb="4">
            {listings.map((bike) => (
              <BikeCard data={bike} key={uuidv4()} />
            ))}
          </SimpleGrid>
        </Box>
      ) : null}
    </Container>
  );
};

export default UserProfile;
