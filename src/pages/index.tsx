import { Text, BaseThemeTypings, Container } from "@chakra-ui/react";
import { useState } from "react";

import Option from "../components/Option";
import Select from "../components/Select";

const Homepage = () => {
  return (
    <div>
      <Container>
        <Text>Chakrathon 2022 Select Component</Text>
        <Select size="sm" variant="outline">
          <Option value="a" label="Ayo">Ayo</Option>
          <Option value="b" label="Bayo">Bayo</Option>
          <Option value="c" label="Dayo">Dayo</Option>
          <Option value="d" label="Layo">Layo</Option>
          <Option value="e" label="Sayo">Sayo</Option>
          <Option value="f" label="Tayo">Tayo</Option>
          <Option value="g" label="Wayo">Wayo</Option>
        </Select>
      </Container>
    </div>
  );
};

export default Homepage;
