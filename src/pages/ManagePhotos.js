import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import UserOnly from "../components/UserOnly";
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

function ManagePhotos() {
  const navigate = useNavigate();
  let { bike_id } = useParams();
  const [count, setCount] = useState(0);
  const formData = new FormData();
  formData.append("upload_preset", "mzzu7s1s");
  const [dbError, setDBError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [photoId, setPhotoId] = useState("");
  const cancelRef = useRef();

  const {
    loading: aloading,
    error: aerror,
    data: adata,
  } = useQuery(BIKE_DATA, {
    variables: { bikeId: bike_id },
  });

  const { refetch } = useQuery(PHOTOS, {
    variables: { bikeId: bike_id },
    onCompleted({ photos }) {
      if (photos) {
        const urls = photos.map((p) => p.url);
        setCount(urls.length);
        setPhotos(urls);
      }
    },
  });

  const [createPhoto] = useMutation(CREATE_PHOTO, {});

  const [deletePhoto, { loading: dloading, error: derror }] = useMutation(
    DELETE_PHOTO,
    {
      onCompleted({ deletePhoto }) {
        if (dloading) console.log("Loading.....");
        if (derror) console.log(derror);
        if (deletePhoto) {
          setDBError(deletePhoto.message);
          refetch();
        }
      },
    }
  );

  const destroyClick = (e) => {
    setCount(count - 1);
    const updatePhotos = photos.filter((p) => p !== photoId);
    setPhotos(updatePhotos);
    deletePhoto({
      variables: { confirmation: true, bikeId: bike_id, url: photoId },
    });
    setIsOpen(false);
  };

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: "image/jpeg, image/png",
    onDrop: async (files) => {
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
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {}
      setCount(count + 1);
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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

  return (
    <Container maxW="xl">
      <UserOnly data={adata} error={aerror} loading={aloading}>
        {dbError ? (
          <Alert status="error">
            <AlertIcon />
            {dbError}
          </Alert>
        ) : null}
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
        <div className="container">
          <SimpleGrid columns={[1, null, 3]} spacing="6" mb="4">
            {photos.map((i) => (
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="1rem"
                overflow="hidden"
                shadow="2xl"
              >
                <AspectRatio maxW="400px" ratio={4 / 3}>
                  <Image publicId={i} alt="Bike Image" />
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
          </SimpleGrid>

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

          {count >= 3 ? (
            <Alert status="error">
              <AlertIcon />
              "Max 3 photos"
            </Alert>
          ) : (
            <Box
              bg="gray"
              mb="4"
              w="100%"
              p={4}
              color="white"
              borderRadius="1rem"
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              {isDragAccept && <p>All files will be accepted</p>}
              {isDragReject && <p>Some files will be rejected</p>}
              {!isDragActive && <p>Drop a file here ... (max: 3 files)</p>}
            </Box>
          )}
          <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </aside>
        </div>
        <Center>
          <Button
            onClick={() => navigate(`/bikes/${bike_id}`)}
            mt={4}
            isFullWidth
            colorScheme="orange"
          >
            Return To Bike
          </Button>
        </Center>
      </UserOnly>
    </Container>
  );
}

export { BIKE_DATA, PHOTOS };
export default ManagePhotos;
