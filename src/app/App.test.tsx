import { render, screen } from "@testing-library/react";

import App from "./App";

describe("Componente App", () => {
  it("deve renderizar o título principal", () => {
    render(<App />);

    // Supondo que seu App tenha um <h1>
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
  });
});
