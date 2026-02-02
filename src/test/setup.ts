import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import "@testing-library/jest-dom";

// Limpa o DOM após cada teste para evitar que um teste influencie o outro
afterEach(() => cleanup());
