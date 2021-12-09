/**
 * TESTS
 * Ensures that theses routes render, call, and receive from
 * the API for Authenticated users
 *
 * user - "/user/user:id" | E2E | public
 * update_user - "/user/user:id/edit" | E2E | public
 * sign_in - "/user/signin" | E2E | public
 * sign_up - "/user/signup" | E2E | public
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

it("/user/:userid renders User component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/user/thetest@aol.com"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Loading...")).toBeTruthy();
});

it("/user/:userid/edit renders UpdateUser component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/user/thetest@aol.com/edit"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Update Your Account")).toBeTruthy();
  expect(screen.getByText("Loading...")).toBeTruthy();
});

it("/user/signin renders SignIn component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/user/signin"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Sign In")).toBeTruthy();
  expect(screen.getByText("Loading...")).toBeTruthy();
});

it("/user/signup renders UpdateUser component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/user/signup"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Sign Up")).toBeTruthy();
  expect(screen.getByText("Loading...")).toBeTruthy();
});

// API is called, response recieved, component renderes according to recieved data.
it("/user/:userid calls API renders User component with public response data", async () => {
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
            owner: false,
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
  await screen.findAllByText("Contact the test.");
  // Publically available data
  // display User Data
  expect(screen.getByText("CA | USA")).toBeTruthy();
  expect(screen.getByText("Listings")).toBeTruthy();
  expect(screen.getByText("About")).toBeTruthy();
});

it("/user/:userid/edit calls API renders UpdateUser component with public response data", async () => {
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
            owner: false,
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
    {
      request: {
        query: IS_USER,
      },
      result: {
        data: {
          authUser: {
            error: true,
            user: false,
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
  await screen.findByText("Sign Into Your Account");
  // Publically available data
  // redirect to signin
  expect(screen.getByText("Sign Into Your Account")).toBeTruthy();
  expect(screen.getByText("Email address")).toBeTruthy();
  expect(screen.getByText("Password")).toBeTruthy();
});

it("/user/signin calls API renders SignIn component with public response data", async () => {
  const mock = [
    {
      request: {
        query: IS_USER,
      },
      result: {
        data: {
          authUser: {
            error: true,
            user: false,
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
  await screen.findByText("Sign Into Your Account");
  // Publically available data
  // redirect to signin
  expect(screen.getByText("Sign Into Your Account")).toBeTruthy();
  expect(screen.getByText("Email address")).toBeTruthy();
  expect(screen.getByText("Password")).toBeTruthy();
});

it("/user/signup calls API renders SignUp component with public response data", async () => {
  const mock = [
    {
      request: {
        query: IS_USER,
      },
      result: {
        data: {
          authUser: {
            error: true,
            user: false,
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
  await screen.findByText("Sign Up for an Account");
  // Publically available data
  // redirect to signin
  expect(screen.getByText("Sign Up for an Account")).toBeTruthy();
  expect(screen.getByText("Email address")).toBeTruthy();
  expect(screen.getByText("Password")).toBeTruthy();
  expect(screen.getByText("Confirm Password")).toBeTruthy();
});
