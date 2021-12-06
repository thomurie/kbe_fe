import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import UserOnly from "../components/user_only";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
  Text,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

const BIKE = gql`
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

function AddPhotos() {
  let { bike_id } = useParams();
  const [count, setCount] = useState(0);
  const formData = new FormData();
  formData.append("upload_preset", "mzzu7s1s");
  const [dbError, setDBError] = useState(false);
  const [photos, setPhotos] = useState([]);

  const {
    loading: aloading,
    error: aerror,
    data: adata,
  } = useQuery(BIKE, {
    variables: { bikeId: bike_id },
  });

  const {
    loading: qloading,
    error: qerror,
    data: qdata,
    refetch,
  } = useQuery(PHOTOS, {
    variables: { bikeId: bike_id },
    onCompleted({ photos }) {
      if (loading) console.log("Loading.....");
      if (error) setDBError(qerror);
      if (photos) {
        const urls = photos.map((p) => p.url);
        setCount(urls.length);
        setPhotos(urls);
      }
    },
  });

  const [createPhoto, { loading, error, data }] = useMutation(CREATE_PHOTO, {
    onCompleted({ createPhoto }) {
      if (loading) console.log("Loading.....");
      if (error) setDBError(error);
      if (createPhoto) console.log(createPhoto);

      //   navigate(`/bikes/${createListing.bike.bike_id}`);
    },
  });

  const [deletePhoto, { loading: dloading, error: derror, data: ddata }] =
    useMutation(DELETE_PHOTO, {
      onCompleted({ deletePhoto }) {
        if (dloading) console.log("Loading.....");
        if (derror) console.log(derror);
        if (deletePhoto) console.log(deletePhoto);
      },
    });

  const destroyClick = (e) => {
    const url = e.target.id;
    const confirmation = true;
    console.log(url, bike_id, confirmation);
    setCount(count - 1);
    const updatePhotos = photos.filter((p) => p !== url);
    setPhotos(updatePhotos);
    deletePhoto({
      variables: { confirmation: confirmation, bikeId: bike_id, url: url },
    });
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
            const url = response.data.public_id;
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
    // <UserOnly data={adata} error={aerror} loading={aloading}>
    <div className="container">
      {dbError ? (
        <Alert status="error">
          <AlertIcon />
          {dbError}
        </Alert>
      ) : null}
      <CloudinaryContext
        cloudName="knobbybikeexch"
        secure="true"
        upload_preset="mzzu7s1s"
      >
        {photos.map((i) => (
          <>
            <Image publicId={i} />
            <Button
              id={i}
              aria-label="Delete Photo"
              colorScheme="teal"
              variant="solid"
              onClick={(e) => destroyClick(e)}
            >
              Delete Photo
            </Button>
          </>
        ))}
      </CloudinaryContext>
      {count >= 3 ? (
        <Alert status="error">
          <AlertIcon />
          "Max 3 photos"
        </Alert>
      ) : (
        <Box
          bg="tomato"
          w="100%"
          p={4}
          color="white"
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
    // </UserOnly>
  );
}

export default AddPhotos;
