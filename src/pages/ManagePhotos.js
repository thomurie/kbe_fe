// EXTERNAL IMPORTS
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  Center,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

// LOCAL IMPORTS
import UserOnly from "../components/UserOnly";

// APOLLO GQL QUERIES
const BIKE_DATA = gql`
  query Query($bikeId: ID!) {
    bike(bike_id: $bikeId) {
      error
      message
      owner
    }
  }
`;

const PHOTOS = gql`
  query Query($bikeId: ID!) {
    photos(bike_id: $bikeId) {
      url
      bike_id
    }
  }
`;

// APOLLO GQL MUTATIONS
const CREATE_PHOTO = gql`
  mutation Mutation($url: String!, $bikeId: ID!) {
    createPhoto(url: $url, bike_id: $bikeId) {
      url
      bike_id
    }
  }
`;

const DELETE_PHOTO = gql`
  mutation Mutation($bikeId: ID!, $url: String!, $confirmation: Boolean!) {
    deletePhoto(bike_id: $bikeId, url: $url, confirmation: $confirmation) {
      error
      message
    }
  }
`;

// APOLLO GQL QUERIES
function ManagePhotos() {
  // CONFIG
  const navigate = useNavigate();
  let { bike_id } = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const formData = new FormData();
  formData.append("upload_preset", "mzzu7s1s");

  // STATE
  const [count, setCount] = useState(0);
  const [dbError, setDBError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoId, setPhotoId] = useState("");
  const [enabled, setEnabled] = useState(true);

  // REF
  const cancelRef = useRef();

  // APOLLO GQL QUERIES
  // Retrieves bike data
  const {
    loading: aloading,
    error: aerror,
    data: adata,
    refetch,
  } = useQuery(BIKE_DATA, {
    variables: { bikeId: bike_id },
  });
  // Retrieves existing photos for this bike
  const {
    loading: ploading,
    error: perror,
    data: pdata,
    refetch: prefetch,
  } = useQuery(PHOTOS, {
    variables: { bikeId: bike_id },
    onCompleted({ photos }) {
      if (photos) {
        const urls = photos.map((p) => p.url);
        setCount(urls.length);
        setPhotos(urls);
      }
    },
  });

  // APOLLO GQL MUTATIONS
  // Adds photo cloudinary and the photo url to the database
  const [createPhoto, { error: cpError }] = useMutation(CREATE_PHOTO, {
    onCompleted() {
      if (cpError) setDBError(cpError.message);
      setEnabled(true);
    },
  });
  // Removes the photo from cloudinary and removes the photo url from the database
  const [deletePhoto, { loading: dloading, error: derror }] = useMutation(
    DELETE_PHOTO,
    {
      onCompleted({ deletePhoto }) {
        if (dloading) console.log("Loading.....");
        if (derror) console.log(derror);
        if (deletePhoto) {
          setDBError(deletePhoto.message);
          refetch();
        } else {
          setCount(count - 1);
          const updatePhotos = photos.filter((p) => p !== photoId);
          setPhotos(updatePhotos);
        }
      },
    }
  );

  // EVENT HANDLERS
  // Handles onClose disclosure
  const onClose = () => setIsOpen(false);
  // Handles click to remove photo
  const destroyClick = (e) => {
    deletePhoto({
      variables: { confirmation: true, bikeId: bike_id, url: photoId },
    });
    setIsOpen(false);
  };
  // Configures dropzone
  // Handles onDrop Event
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: "image/jpeg, image/png",
      onDrop: async (files) => {
        console.log("here");
        setEnabled(false);
        formData.append("file", files[0]);
        try {
          axios
            .post(
              "https://api.cloudinary.com/v1_1/knobbybikeexch/image/upload",
              formData
            )
            .then((response) => {
              const url = response.data.url;
              createPhoto({ variables: { bikeId: bike_id, url } });
              const updatePhotos = [...photos, url];
              setPhotos(updatePhotos);
              setDBError("");
            })
            .catch((error) => {
              setDBError("Upload failed. Please try again.");
            });
        } catch (error) {
          setDBError("Upload failed. Please try again.");
        }
        setCount(count + 1);
      },
    });
  // Lists and identifies photos that were properly uploaded
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  // Lists and identifies photos that failed to upload
  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  useEffect(() => {
    prefetch();
  }, [prefetch]);

  return (
    <Container maxW="xl">
      {/* HEADING */}
      <Heading
        as="h1"
        size="xl"
        fontWeight="bold"
        color="primary.800"
        textAlign={["center", "center", "left", "left"]}
        mb="4"
      >
        Add Photos To Your Bike
      </Heading>
      {/* ERROR HANDLING */}
      {dbError ? (
        <Alert status="error" textTransform={"capitalize"} mb="4">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      {/* DISPLAY EXISTING PHOTOS */}
      <SimpleGrid columns={[1, null, 3]} spacing="6" mb="4">
        <UserOnly type="photos" data={pdata} error={perror} loading={ploading}>
          {photos.map((i) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="1rem"
              overflow="hidden"
              shadow="2xl"
            >
              <AspectRatio maxW="400px" ratio={4 / 3}>
                <Image src={i} alt="Bike Image" />
              </AspectRatio>
              <Button
                id={i}
                aria-label="Delete Photo"
                colorScheme="orange"
                variant="solid"
                onClick={(e) => {
                  setPhotoId(e.target.id);
                  setIsOpen(true);
                }}
                isFullWidth
              >
                Delete Photo
              </Button>
            </Box>
          ))}
        </UserOnly>
      </SimpleGrid>
      {/* ALERT ON DELETE CLICK */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Photo
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={destroyClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <UserOnly type="dropzone" data={adata} error={aerror} loading={aloading}>
        {/* IF THERE ARE 3 PHOTOS THEN DROPZONE IS DISABLED */}
        {count >= 3 ? (
          <Alert status="error">
            <AlertIcon />
            "Max 3 photos"
          </Alert>
        ) : (
          <Box
            bg="gray.400"
            mb="4"
            w="100%"
            p={4}
            color="white"
            borderRadius="1rem"
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            <p>Drag-n-Drop or click to add a file (max: 3 files)</p>
          </Box>
        )}
        {/* ACCEPTED/REJECTED FILES */}
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>

        {/* NEXT / UPDATE BIKE */}
        <Center>
          {enabled ? (
            <Button
              textTransform={"capitalize"}
              onClick={() => navigate(`/bikes/${bike_id}`)}
              mt={4}
              isFullWidth
              colorScheme="orange"
            >
              {q} Bike
            </Button>
          ) : (
            <Button
              textTransform={"capitalize"}
              mt={4}
              isFullWidth
              colorScheme="orange"
              disabled
            >
              {q} Bike
            </Button>
          )}
        </Center>
      </UserOnly>
    </Container>
  );
}

export { BIKE_DATA, PHOTOS };
export default ManagePhotos;
