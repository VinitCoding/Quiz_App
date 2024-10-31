import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set default color mode to light
    useSystemColorMode: false, // Prevents auto-switching to system color mode
  },
});

export default theme;
