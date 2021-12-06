import { Box, Badge, AspectRatio } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
/**
 * TODO:
 * PHOTO
 * Badge should show new if bike is within certain date range.
 *
 * @param {} param0
 * @returns
 */

const BikeCard = ({ data }) => {
  const navigate = useNavigate();
  let photo = "https://via.placeholder.com/150";
  if (data.photos && data.photos.length > 0) photo = data.photos[0].url;

  const handleClick = () => {
    navigate(`/bikes/${data.bike_id}`);
  };
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleClick}
    >
      <CloudinaryContext
        cloudName="knobbybikeexch"
        secure="true"
        upload_preset="mzzu7s1s"
      >
        <AspectRatio maxW="400px" ratio={4 / 3}>
          <Image publicId={photo} alt="Bike Image" />
        </AspectRatio>
      </CloudinaryContext>

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
  );
};

export default BikeCard;
