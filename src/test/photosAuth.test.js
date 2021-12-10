// /**
//  * TESTS
//  * Ensures that theses routes render, call, and receive from
//  * the API for Authenticated users
//  *
//  * photos - view | E2E | authenticated
//  * photos - create max (3) | E2E | authenticated
//  * photos - delete | E2E | authenticated
//  */
// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "../App";
// import { MemoryRouter } from "react-router-dom";
// import { MockedProvider } from "@apollo/client/testing";
// import ManagePhotos from "../pages/ManagePhotos";
// import { BIKE } from "../pages/Bike";
// import { BIKE_DATA, PHOTOS } from "../pages/ManagePhotos";
// import { CACHED_USER } from "../components/App";

// // API is called, response recieved, component renderes according to recieved data.
// it("/bikes/:bikeid/edit/photos calls API renders component with authorized user response data", async () => {
//   const mock = [
//     {
//       request: {
//         query: PHOTOS,
//       },
//       result: {
//         data: {
//           photos: [
//             {
//               url: "wuxmctcwadjh93kw2eta",
//               bike_id: "18811fb7-fe3f-4631-b382-f463cf874fb8",
//             },
//           ],
//         },
//       },
//     },
//     {
//       request: {
//         query: BIKE_DATA,
//         variables: { bikeId: "18811fb7-fe3f-4631-b382-f463cf874fb8" },
//       },
//       result: {
//         data: {
//           bike: {
//             error: false,
//             message: null,
//             owner: true,
//           },
//         },
//       },
//     },
//   ];
//   render(
//     <MockedProvider mocks={mock} addTypename={false}>
//       <MemoryRouter
//         initialEntries={[
//           "/bikes/18811fb7-fe3f-4631-b382-f463cf874fb8/edit/photos",
//         ]}
//       >
//         <ManagePhotos />
//       </MemoryRouter>
//     </MockedProvider>
//   );
//   await screen.findAllByText("Drop a file here ... (max: 3 files)");
//   // Authorized user only data
//   // show upload screen
//   expect(screen.getByText("Accepted files")).toBeTruthy();
// });
