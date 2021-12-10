// EXTERNAL IMPORTS
import { Link as RLink } from "react-router-dom";
import {
  Box,
  AspectRatio,
  Container,
  Flex,
  Stack,
  Heading,
  Link,
  Image,
} from "@chakra-ui/react";

// LOCAL IMPORTS
import CardImg4 from "../assets/dmitrii-vaccinium-9qsK2QHidmg-unsplash.jpg";

// PAGENOT FOUND COMPONENT
const PageNotFound = () => {
  return (
    <Container maxW="container.xl" mt="4">
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
      >
        {/* IMAGE */}
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <AspectRatio ratio={4 / 3}>
            <Image src={CardImg4} size="50%" rounded="1rem" shadow="2xl" />
          </AspectRatio>
        </Box>
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
          mb={{ base: 12, md: 0 }}
        >
          {/* MESSAGE */}
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            Page Not Found
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
            {/* REDIRECT TO BIKES BUTTON */}
            <Link as={RLink} to="/bikes">
              Check out our Bikes
            </Link>
          </Heading>
        </Stack>
      </Flex>
    </Container>
  );
};

export default PageNotFound;
