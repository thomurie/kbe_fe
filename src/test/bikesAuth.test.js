/**
 * TESTS
 * Ensures that theses routes render, call, and receive from
 * the API for Authenticated users
 *
 * all_bikes - "/bikes" | E2E | authenticated
 * bike - "/bikes/:bikeid " | E2E | authenticated
 * create_bike - "/bikes/new" | E2E | authenticated
 * update_bike - "/bikes/:bikeid/edit" | E2E | authenticated
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { BIKE } from "../pages/Bike";
import { AUTH_USER } from "../pages/CreateBike";
import { BIKE_INFO } from "../pages/UpdateBike";

const mocks = [];

// API is called, response recieved, component renderes according to recieved data.
it("/bike/:bikeid calls API renders Bike component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: BIKE,
        variables: { bikeId: "f67f45e3-1ad4-433a-9b25-6ee56f93137c" },
      },
      result: {
        data: {
          bike: {
            error: false,
            message: null,
            owner: true,
            bike: {
              user_id: {
                email: "thetest@aol.com",
                first_name: "the",
                last_name: "test",
              },
              bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
              make: "specialized",
              model: "stumpjumper",
              year: 2010,
              price: 2010,
              country: "USA",
              region: "CA",
              about: "",
              size: "M",
              color: "black",
              wheel_size: "26",
              suspension: "none",
              front: 0,
              rear: 0,
              upgrades: "",
              photos: [],
            },
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter
        initialEntries={["/bikes/f67f45e3-1ad4-433a-9b25-6ee56f93137c"]}
      >
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findByText("Edit Bike");
  // Publically available data
  // shows bike make and model
  expect(screen.findAllByText("specialized")).toBeTruthy();
  expect(screen.findAllByText("stumpjumper")).toBeTruthy();

  // Authorized user only data
  // shows favorite button
  expect(screen.findAllByText("Favorite")).toBeTruthy();
  expect(screen.getByText("Delete Bike")).toBeTruthy();
});

it("/bikes/new calls API renders CreateBike component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: AUTH_USER,
      },
      result: {
        data: {
          authUser: {
            error: false,
            message: "",
            token: null,
            user: {
              country: "USA",
              region: "CA",
            },
          },
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter initialEntries={["/bikes/new"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findByText("Make");
  // Authorized user only data
  // Shows Form
  expect(screen.getByText("Add a New Bike")).toBeTruthy();
  expect(screen.getByText("Make")).toBeTruthy();
  expect(screen.getByText("Model")).toBeTruthy();
});

it("/bikes/bike:id/edit calls API renders UpdateBike component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: BIKE_INFO,
        variables: { bikeId: "f67f45e3-1ad4-433a-9b25-6ee56f93137c" },
      },
      result: {
        data: {
          bike: {
            error: false,
            message: null,
            owner: true,
            bike: {
              user_id: {
                email: "thetest@aol.com",
                first_name: "the",
                last_name: "test",
              },
              bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
              make: "specialized",
              model: "stumpjumper",
              year: 2010,
              price: 2010,
              country: "USA",
              region: "CA",
              about: "",
              size: "M",
              color: "black",
              wheel_size: "26",
              suspension: "none",
              front: 0,
              rear: 0,
              upgrades: "",
            },
          },
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter
        initialEntries={["/bikes/f67f45e3-1ad4-433a-9b25-6ee56f93137c/edit"]}
      >
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findByText("Update Bike");

  // Authorized user only data
  // Shows Form
  expect(screen.getByText("Update A Bike")).toBeTruthy();
  expect(screen.getByText("Make")).toBeTruthy();
  expect(screen.getByText("Model")).toBeTruthy();
});
