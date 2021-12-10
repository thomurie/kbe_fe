// /**
//  * TESTS
//  * Ensures that theses routes render, call, and receive from
//  * the API for public users
//  *
//  * all_bikes - "/bikes" | E2E | public
//  * bike - "/bikes/:bikeid " | E2E | public
//  * create_bike - "/bikes/new" | E2E | public
//  * update_bike - "/bikes/:bikeid/edit" | E2E | public
//  */

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "../App";
// import { MemoryRouter } from "react-router-dom";
// import { MockedProvider } from "@apollo/react-testing";
// import { ALL_BIKES } from "../pages/AllBikes";
// import { BIKE } from "../pages/Bike";
// import { AUTH_USER } from "../pages/CreateBike";
// import { BIKE_INFO } from "../pages/UpdateBike";
// import { IS_USER } from "../pages/SignIn";

// const mocks = [];

// // Components Render
// it("/bikes renders AllBikes component", () => {
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <MemoryRouter initialEntries={["/bikes"]}>
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );
//   expect(screen.getByText("This is All the Bikes")).toBeTruthy();
//   expect(screen.getByText("Loading...")).toBeTruthy();
// });

// it("/bike renders Bike component", () => {
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <MemoryRouter
//         initialEntries={["/bikes/f67f45e3-1ad4-433a-9b25-6ee56f93137c"]}
//       >
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );

//   expect(screen.getByText("This is the Bike")).toBeTruthy();
//   expect(screen.getByText("Loading...")).toBeTruthy();
// });

// it("/bikes/new renders CreateBike component", () => {
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <MemoryRouter initialEntries={["/bikes/new"]}>
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );

//   expect(screen.getByText("Add a New Bike")).toBeTruthy();
//   expect(screen.getByText("Loading...")).toBeTruthy();
// });

// it("/bikes/bike:id/edit renders UpdateBike component", () => {
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <MemoryRouter
//         initialEntries={["/bikes/f67f45e3-1ad4-433a-9b25-6ee56f93137c/edit"]}
//       >
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );

//   expect(screen.getByText("Loading...")).toBeTruthy();
// });

// // API is called, response recieved, component renderes according to recieved data.
// it("/bikes calls API renders AllBikes component with public response data", async () => {
//   const mock = [
//     {
//       request: {
//         query: ALL_BIKES,
//         variables: { offset: 0, limit: 6 },
//       },
//       result: {
//         data: {
//           bikes: [
//             {
//               bike_id: "18811fb7-fe3f-4631-b382-f463cf874fb8",
//               make: "specialized",
//               model: "stumpjumper",
//               year: 2010,
//               price: 2010,
//               country: "USA",
//               region: "CA",
//               photos: [
//                 {
//                   url: "wuxmctcwadjh93kw2eta",
//                 },
//               ],
//             },
//             {
//               bike_id: "42e68392-d810-4955-8b5f-f0afa7120441",
//               make: "specialized",
//               model: "stumpjumper",
//               year: 2010,
//               price: 2010,
//               country: "USA",
//               region: "CA",
//               photos: [
//                 {
//                   url: "bi3tx4va5vz13dpoxqsk",
//                 },
//               ],
//             },
//             {
//               bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
//               make: "specialized",
//               model: "stumpjumper",
//               year: 2010,
//               price: 2010,
//               country: "USA",
//               region: "CA",
//               photos: [],
//             },
//             {
//               bike_id: "087df1de-2ac8-4885-ad36-a5798ad90b02",
//               make: "specialized",
//               model: "stumpjumper",
//               year: 2010,
//               price: 2010,
//               country: "USA",
//               region: "CA",
//               photos: [],
//             },
//           ],
//         },
//       },
//     },
//   ];

//   render(
//     <MockedProvider mocks={mock} addTypename={false}>
//       <MemoryRouter initialEntries={["/bikes"]}>
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );

//   await screen.findAllByText("2010 | specialized | stumpjumper");

//   // Publically available data
//   // expect there to be 4 cards
//   expect(
//     (await screen.findAllByText("2010 | specialized | stumpjumper")).length
//   ).toEqual(4);
// });

// it("/bike/:bikeid calls API renders Bike component with public response data", async () => {
//   const mock = [
//     {
//       request: {
//         query: BIKE,
//         variables: { bikeId: "f67f45e3-1ad4-433a-9b25-6ee56f93137c" },
//       },
//       result: {
//         data: {
//           bike: {
//             error: false,
//             message: null,
//             owner: false,
//             bike: {
//               user_id: {
//                 email: "thetest@aol.com",
//                 first_name: "the",
//                 last_name: "test",
//               },
//               bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
//               make: "specialized",
//               model: "stumpjumper",
//               year: 2010,
//               price: 2010,
//               country: "USA",
//               region: "CA",
//               about: "",
//               size: "M",
//               color: "black",
//               wheel_size: "26",
//               suspension: "none",
//               front: 0,
//               rear: 0,
//               upgrades: "",
//               photos: [],
//             },
//           },
//         },
//       },
//     },
//   ];

//   render(
//     <MockedProvider mocks={mock} addTypename={false}>
//       <MemoryRouter
//         initialEntries={["/bikes/f67f45e3-1ad4-433a-9b25-6ee56f93137c"]}
//       >
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );

//   await screen.findByText("specialized");
//   // Publically available data
//   // shows bike make and model
//   expect(screen.findAllByText("specialized")).toBeTruthy();
//   expect(screen.findAllByText("stumpjumper")).toBeTruthy();
// });

// it("/bikes/new calls API renders CreateBike component with public response data", async () => {
//   const mock = [
//     {
//       request: {
//         query: AUTH_USER,
//       },
//       result: {
//         data: {
//           authUser: {
//             error: true,
//             message: "",
//             user: null,
//           },
//         },
//       },
//     },
//     {
//       request: {
//         query: IS_USER,
//       },
//       result: {
//         data: {
//           authUser: {
//             error: true,
//             message: "",
//             user: null,
//           },
//         },
//       },
//     },
//   ];
//   render(
//     <MockedProvider mocks={mock} addTypename={false}>
//       <MemoryRouter initialEntries={["/bikes/new"]}>
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );
//   await screen.findByText("Sign Into Your Account");
//   // Publically available data
//   // redirects to signin

//   expect(screen.getByText("Sign Into Your Account")).toBeTruthy();
//   expect(screen.getByText("Email address")).toBeTruthy();
//   expect(screen.getByText("Password")).toBeTruthy();
// });

// it("/bikes/bike:id/edit calls API renders UpdateBike component with public response data", async () => {
//   const mock = [
//     {
//       request: {
//         query: BIKE_INFO,
//         variables: { bikeId: "f67f45e3-1ad4-433a-9b25-6ee56f93137c" },
//       },
//       result: {
//         data: {
//           bike: {
//             error: false,
//             message: null,
//             owner: false,
//             bike: {
//               user_id: {
//                 email: "thetest@aol.com",
//                 first_name: "the",
//                 last_name: "test",
//               },
//               bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
//               make: "specialized",
//               model: "stumpjumper",
//               year: 2010,
//               price: 2010,
//               country: "USA",
//               region: "CA",
//               about: "",
//               size: "M",
//               color: "black",
//               wheel_size: "26",
//               suspension: "none",
//               front: 0,
//               rear: 0,
//               upgrades: "",
//             },
//           },
//         },
//       },
//     },
//     {
//       request: {
//         query: IS_USER,
//       },
//       result: {
//         data: {
//           authUser: {
//             error: true,
//             user: null,
//           },
//         },
//       },
//     },
//   ];
//   render(
//     <MockedProvider mocks={mock} addTypename={false}>
//       <MemoryRouter
//         initialEntries={["/bikes/f67f45e3-1ad4-433a-9b25-6ee56f93137c/edit"]}
//       >
//         <App />
//       </MemoryRouter>
//     </MockedProvider>
//   );

//   await screen.findByText("Sign Into Your Account");
//   // Publically available data
//   // redirects to signin

//   expect(screen.getByText("Sign Into Your Account")).toBeTruthy();
// });
