import { createContext } from "react";

export const SectionContext = createContext({
  section: "home",
  setSection: () => {},
});
