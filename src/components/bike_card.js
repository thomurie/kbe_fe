import { Box, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// bike_id: "1e280add-1ff7-45e2-bda6-39088a4fe342";
// country: "USA";
// make: "Santa Cruz";
// model: "Nomad";
// price: 6000;
// region: "OR";
// year: 2010;

function BikeCard({ data }) {
  console.log(data);
  const url = `/bikes/${data.bike_id}`;
  return (
    <Link to={url}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {data.year} | {data.make} | {data.model}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {/* {property.title} */}
          </Box>

          <Box>
            ${data.price} {data.country} | {data.region}
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {/* {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))} */}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {/* {property.reviewCount} reviews */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default BikeCard;
