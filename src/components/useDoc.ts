// @ts-ignore
import { useDoc as useDocOrig } from "@docusaurus/theme-common/internal";
import { DocContextValue } from "@docusaurus/theme-common/lib/contexts/doc";

// For future compatibility with Docusaurus, this hook encapsulates the useColorMode hook. Docusaurus sometimes makes breaking changes...
export const useDoc: () => DocContextValue = useDocOrig;
