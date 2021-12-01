import { Box, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * TODO:
 * PHOTO
 * Badge should show new if bike is within certain date range.
 *
 * @param {} param0
 * @returns
 */

const BikeCard = ({ data }) => {
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

          <Box>
            ${data.price} {data.country} | {data.region}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default BikeCard;
