import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

/**
 * This tests that the following routes are publicly available.
 * Home - "/"
 * About - "/about"
 * PageNotFound - "/not_a_route"
 */

const mocks = []; // We'll fill this in next

it("Renders Home Page and Welcome message", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Welcome to Knobby Bike Exchange")).toBeTruthy();
});

it("Renders PageNotFound when an unidentified route is entered", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/not_a_route"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText("Page Not Found")).toBeTruthy();
});
