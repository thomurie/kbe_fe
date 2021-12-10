/**
 * TESTS
 * photos - create | E2E | authentication
 * photos - create max (3) | E2E | authentication
 * photos - view on bike_card | E2E | public
 * photos - view on bike_page | E2E | public
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import ManagePhotos from "../pages/ManagePhotos";
import { BIKE } from "../pages/Bike";
import { BIKE_DATA, PHOTOS } from "../pages/ManagePhotos";
import { IS_USER } from "../pages/SignIn";
import { CACHED_USER } from "../App";

const mocks = [];

it("/bikes/:bikeid/edit/photos renders CreatePhotos component", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter
        initialEntries={[
          "/bikes/18811fb7-fe3f-4631-b382-f463cf874fb8/edit/photos",
        ]}
      >
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Loading...")).toBeTruthy();
});

// API is called, response recieved, component renderes according to recieved data.
it("/bikes/:bikeid/edit/photos calls API renders component with public response data", async () => {
  const mock1 = [
    {
      request: {
        query: BIKE_DATA,
        variables: {
          bikeId: "test",
        },
      },
      result: {
        data: {
          bike: {
            error: false,
            message: null,
            owner: false,
          },
        },
      },
    },
  ];
  const mock = [
    {
      request: {
        query: BIKE_DATA,
        variables: { bikeId: "1234" },
      },
      result: {
        data: {
          bike: {
            error: false,
            message: null,
            owner: false,
          },
        },
      },
    },
    {
      request: {
        query: IS_USER,
      },
      result: {
        data: {
          authUser: {
            error: true,
            user: null,
          },
        },
      },
    },
    {
      request: {
        query: CACHED_USER,
      },
      result: {
        data: {
          authUser: {
            error: true,
            user: {
              email: null,
              first_name: null,
              last_name: null,
            },
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mock1} addTypename={false}>
      <MemoryRouter initialEntries={["/bikes/1234/edit/photos"]}>
        <ManagePhotos />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findAllByText("Email address");

  // Publically available data
  // expect to reroute to sign in
  expect(screen.getByText("Sign Into Your Account")).toBeTruthy();

  // Authorized user only data
  // Does not show upload
  expect(screen.getByText("Drop a file here")).toBeFalsy();
});
