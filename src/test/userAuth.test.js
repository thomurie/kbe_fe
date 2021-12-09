/**
 * TESTS
 * Ensures that theses routes render, call, and receive from
 * the API for Authenticated users
 *
 * user - "/user/user:id" | E2E | authenticated
 * update_user - "/user/user:id/edit" | E2E | authenticated
 * sign_in - "/user/signin" | E2E | authenticated
 * sign_up - "/user/signup" | E2E | authenticated
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { USER } from "../pages/User";
import { INTIAL_USER } from "../pages/UpdateUser";
import { IS_USER } from "../pages/SignIn";

const mocks = [];

// API is called, response recieved, component renderes according to recieved data.
it("/user/:userid calls API renders User component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: USER,
        variables: { email: "thetest@aol.com" },
      },
      result: {
        data: {
          user: {
            error: false,
            owner: true,
            message: null,
            user: {
              email: "thetest@aol.com",
              first_name: "the",
              last_name: "test",
              country: "USA",
              region: "CA",
              phone: "",
              sms: true,
              bio: "",
              listings: [
                {
                  bike_id: "18811fb7-fe3f-4631-b382-f463cf874fb8",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "42e68392-d810-4955-8b5f-f0afa7120441",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "087df1de-2ac8-4885-ad36-a5798ad90b02",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
              ],
              favorites: null,
            },
          },
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter initialEntries={["/user/thetest@aol.com"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findAllByText("Edit Profile");
  // Authenticated available data
  // display User Data
  expect(screen.getByText("CA | USA")).toBeTruthy();
  expect(screen.getByText("Listings")).toBeTruthy();
  expect(screen.getByText("Delete Profile")).toBeTruthy();
});

it("/user/:userid/edit calls API renders UpdateUser component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: INTIAL_USER,
        variables: { email: "thetest@aol.com" },
      },
      result: {
        data: {
          user: {
            error: false,
            owner: true,
            message: null,
            user: {
              email: "thetest@aol.com",
              first_name: "the",
              last_name: "test",
              country: "USA",
              region: "CA",
              phone: "",
              sms: true,
              bio: "",
            },
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter initialEntries={["/user/thetest@aol.com/edit"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findByText("Update Your Account");
  // Authorized user only data
  // Shows form
  expect(screen.getByText("First Name")).toBeTruthy();
  expect(screen.getByText("Last Initial")).toBeTruthy();
  expect(screen.getByText("Region")).toBeTruthy();
  expect(screen.getByText("Update Your Account")).toBeTruthy();
});

it("/user/signin calls API renders SignIn component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: IS_USER,
      },
      result: {
        data: {
          authUser: {
            error: false,
            user: {
              email: "thetest@aol.com",
            },
          },
        },
      },
    },
    {
      request: {
        query: USER,
        variables: { email: "thetest@aol.com" },
      },
      result: {
        data: {
          user: {
            error: false,
            owner: true,
            message: null,
            user: {
              email: "thetest@aol.com",
              first_name: "the",
              last_name: "test",
              country: "USA",
              region: "CA",
              phone: "",
              sms: true,
              bio: "",
              listings: [
                {
                  bike_id: "18811fb7-fe3f-4631-b382-f463cf874fb8",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "42e68392-d810-4955-8b5f-f0afa7120441",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "087df1de-2ac8-4885-ad36-a5798ad90b02",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
              ],
              favorites: null,
            },
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter initialEntries={["/user/signin"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findByText("Sign Out");

  // Authorized user only data
  // redirect to Home
  expect(screen.getByText("Edit Profile")).toBeTruthy();
});

it("/user/signup calls API renders SignUp component with authorized user response data", async () => {
  const mock = [
    {
      request: {
        query: IS_USER,
      },
      result: {
        data: {
          authUser: {
            error: false,
            user: {
              email: "thetest@aol.com",
            },
          },
        },
      },
    },
    {
      request: {
        query: USER,
        variables: { email: "thetest@aol.com" },
      },
      result: {
        data: {
          user: {
            error: false,
            owner: true,
            message: null,
            user: {
              email: "thetest@aol.com",
              first_name: "the",
              last_name: "test",
              country: "USA",
              region: "CA",
              phone: "",
              sms: true,
              bio: "",
              listings: [
                {
                  bike_id: "18811fb7-fe3f-4631-b382-f463cf874fb8",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "42e68392-d810-4955-8b5f-f0afa7120441",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "f67f45e3-1ad4-433a-9b25-6ee56f93137c",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
                {
                  bike_id: "087df1de-2ac8-4885-ad36-a5798ad90b02",
                  make: "specialized",
                  model: "stumpjumper",
                  year: 2010,
                  price: 2010,
                  country: "USA",
                  region: "CA",
                  photos: null,
                },
              ],
              favorites: null,
            },
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mock} addTypename={false}>
      <MemoryRouter initialEntries={["/user/signup"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  await screen.findByText("Sign Out");
  // Authorized user only data
  // redirect to Home
  expect(screen.getByText("Edit Profile")).toBeTruthy();
});
