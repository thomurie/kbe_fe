// EXTERNAL IMPORTS
import { Link as RLink } from "react-router-dom";
import {
  Divider,
  AspectRatio,
  Box,
  Heading,
  Container,
  Flex,
  Link,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";

// HOME COMPONENT
const Home = () => {
  // IMAGES
  const HomeImg =
    "https://res.cloudinary.com/knobbybikeexch/image/upload/v1639496105/Used-Mountain-Exchange_lcexjc.jpg";
  const CardImg1 =
    "https://res.cloudinary.com/knobbybikeexch/image/upload/q_80/v1639496183/Used-Bikes_j8etfh.jpg";
  const CardImg2 =
    "https://res.cloudinary.com/knobbybikeexch/image/upload/q_80/v1639496139/Mountain-Bike-Marketplace_gccfqh.jpg";
  const CardImg3 =
    "https://res.cloudinary.com/knobbybikeexch/image/upload/q_80/v1639496162/Used-Mountain-Bikes_wvmggn.jpg";
  
  // RETURNS
  return (
    <Container maxW="container.xl">
      {/* HERO */}
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mt="4"
        mb={16}
      >
        {/* HERO - IMAGE */}
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <AspectRatio ratio={4 / 3}>
            <Image src={HomeImg} size="50%" rounded="1rem" shadow="2xl" />
          </AspectRatio>
        </Box>
        {/* HERO - TEXT */}
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
          >
            Welcome to Knobby Bike Exchange
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
            The premier online marketplace for premium used mountain bikes{" "}
            <br></br>
            <Link as={RLink} to="/bikes" color="orange">
              Check out our Bikes
            </Link>
          </Heading>
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            No credit card required.
          </Text>
        </Stack>
      </Flex>
      {/* ACTION CARDS*/}
      <Flex
        align="center"
        justify="space-around"
        direction={{ base: "column", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
      >
        {/* ACTION CARD - ALL BIKES  */}
        <Box
          maxW="md"
          borderWidth="1px"
          borderRadius="1rem"
          overflow="hidden"
          mb={{ base: 10, md: 0 }}
          shadow="2xl"
        >
          <AspectRatio ratio={4 / 3}>
            <Image src={CardImg1} size="40%" rounded="1rem" />
          </AspectRatio>
          <Box p="6" mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color="orange"
            >
              Knobby Bike Exchange
            </Text>
            <Text mt={2} color="gray.500">
              We’re drawn to our local trails for lots of reasons, whether it’s
              to chase that rush of speed, explore the outdorrs, or simply
              escaping the daily grind. No matter your experience level we'll
              help you find a premium used mountain bike that has you
              YEEEEEEEWWWWing in no time.
            </Text>
            <Text mt={2} color="orange">
              <Link as={RLink} to="/bikes">
                Check out our Bikes
              </Link>
            </Text>
          </Box>
        </Box>
        {/* ACTION CARD - CREATE BIKE */}
        <Box
          maxW="md"
          borderWidth="1px"
          borderRadius="1rem"
          overflow="hidden"
          shadow="2xl"
        >
          <AspectRatio ratio={4 / 3}>
            <Image src={CardImg2} size="40%" rounded="1rem" />
          </AspectRatio>
          <Box p="6" mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color="orange"
            >
              List Your Bike
            </Text>
            <Text mt={2} color="gray.500">
              Everyone Knows that the perfect number of bikes is N+1. But
              sometimes we need to make space in our garages for the next one.
              Knobyy Bike Exchange helps you sell your bike with ease. List your
              bike on a site that makes your bike look as good as the day you
              bought it.
            </Text>
            <Text mt={2} color="orange">
              <Link as={RLink} to="/bikes/new">
                List My Bike
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
      <Divider />
      {/* VALUE */}
      <Box p={4} display={{ md: "flex" }}>
        <Box flexShrink={0}>
          <AspectRatio
            ratio={4 / 3}
            size="40%"
            width={{ md: 60, lg: 80, xl: 80 }}
          >
            <Image src={CardImg3} size="40%" rounded="1rem" shadow="2xl" />
          </AspectRatio>
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="orange"
          >
            The Best Used Moutain Bikes
          </Text>
          <Text mt={2} color="gray.500">
            Used bikes have a ton to live up to. We should know what were
            getting from the listing not after we reach out to the seller. We
            understand that nothing is worse than going to look at a Full Carbon
            S-Works Stumpjumper and finding out its a spray painted Schwin.
            That's we require more details from our sellers
          </Text>
          <Text mt={2} color="orange">
            <Link as={RLink} to="/bikes">
              See the Difference
            </Link>
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
