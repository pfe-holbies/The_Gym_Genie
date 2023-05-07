import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vitest } from "vite-plugin-test";

import Navhome from "./Navhome";

vitest("Navhome component", () => {
  it("renders without errors", () => {
    render(
      <Router>
        <Navhome />
      </Router>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /SignUp/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();
  });

  it('hides the login and register links when "hideLinks" prop is true', () => {
    render(
      <Router>
        <Navhome hideLinks={true} />
      </Router>
    );

    expect(
      screen.queryByRole("link", { name: /SignUp/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Login/i })
    ).not.toBeInTheDocument();
  });

  it("toggles the navigation menu when the toggle button is clicked", () => {
    render(
      <Router>
        <Navhome />
      </Router>
    );

    expect(
      screen.queryByRole("button", { name: /toggle navigation menu/i })
    ).not.toBeInTheDocument();

    userEvent.click(
      screen.getByRole("button", { name: /open navigation menu/i })
    );

    expect(screen.getByRole("link", { name: /SignUp/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();

    userEvent.click(
      screen.getByRole("button", { name: /close navigation menu/i })
    );

    expect(
      screen.queryByRole("link", { name: /SignUp/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Login/i })
    ).not.toBeInTheDocument();
  });
});
