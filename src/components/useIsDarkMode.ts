import { useColorMode as useColorMode } from "@docusaurus/theme-common";

// For future compatibility with Docusaurus, this hook encapsulates the useColorMode hook. Docusaurus sometimes makes breaking changes...
export const useIsDarkMode = () => useColorMode().colorMode === "dark";
