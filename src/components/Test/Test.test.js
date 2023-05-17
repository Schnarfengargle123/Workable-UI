import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Test from "./Test";

describe("Test component", () => {
  test("title rendering in DOM", () => {
    render(<Test />);
    const welcomeMessage = screen.getByText("Test");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
