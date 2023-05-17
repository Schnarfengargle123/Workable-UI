import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Auth from "./Auth";

describe("Auth component", () => {
  test("toggles from state on button click", () => {
    render(<Auth />);
    const toggleFormButton = screen.getByText("or Register");
    expect(toggleFormButton).toBeInTheDocument();
  });
});

