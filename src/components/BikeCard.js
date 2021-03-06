// EXTERNAL IMPORTS
import { Box, AspectRatio, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// BIKE CARD COMPONENT
const BikeCard = ({ data }) => {
  // CONFIG
  const navigate = useNavigate();
  let photo = "https://via.placeholder.com/150";
  if (data.photos && data.photos.length > 0)
    photo =
      "https://res.cloudinary.com/knobbybikeexch/image/upload/c_thumb,w_350,g_face/".concat(
        data.photos[0].url.split("upload/")[1]
      );

  // EVENT HANDLERS
  const handleClick = () => {
    navigate(`/bikes/${data.bike_id}`);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="1rem"
      overflow="hidden"
      shadow="2xl"
      onClick={handleClick}
    >
      {/* IMAGE */}
      <AspectRatio maxW="340px" ratio={4 / 3}>
        <Image src={photo} alt="Bike Image" />
      </AspectRatio>
      {/* INFO */}
      <Box p="6">
        {/* MAKE MODEL */}
        <Box display="flex" flexDirection="column" alignItems="base-line">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            fontSize="md"
            textTransform="uppercase"
            letterSpacing="wide"
            ml="2"
          >
            {data.make.substring(0, 11)} {data.model.substring(0, 11)}
          </Box>
          {/* PRICE | COUNTRY | REGION | YEAR */}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            ${data.price} | {data.country} | {data.region} | {data.year}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BikeCard;
