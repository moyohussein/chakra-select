import { ChakraProvider } from "@chakra-ui/react";

import Homepage from "./pages";

import theme from "./theme";

import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Homepage />
    </ChakraProvider>
  );
}

export default App;
