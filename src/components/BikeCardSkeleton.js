// EXTERNAL IMPORTS
import { Box, AspectRatio, Image, Skeleton } from "@chakra-ui/react";

// BIKE CARD COMPONENT
const BikeCardSkeleton = () => {
  return (
    <Skeleton
      borderWidth="1px"
      borderRadius="1rem"
      overflow="hidden"
      shadow="2xl"
    >
      <Box maxW="sm">
        <Skeleton>
          <AspectRatio maxW="400px" ratio={4 / 3}>
            <Image />
          </AspectRatio>
        </Skeleton>
        <Skeleton>
          <Box p="6"></Box>
        </Skeleton>
      </Box>
    </Skeleton>
  );
};

export default BikeCardSkeleton;
