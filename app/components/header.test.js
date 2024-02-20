import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header", () => {
  it("renders an h1 tag", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
