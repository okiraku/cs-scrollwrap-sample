import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: "white"
      }
    }
  },
  fonts: {
    heading: "Italiana, sans-serif",
    body: "Limelight, sans-serif"
  }
});

export default theme;
