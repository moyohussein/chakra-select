import { Text, BaseThemeTypings } from "@chakra-ui/react";

import Option from "../components/Option";
import Select from "../components/Select";

const Homepage = () => {
  return (
    <div>
      <Text>Homepage</Text>
      <Select placeholder="Select Option">
        <Option label="shayo">Shayo</Option>
      </Select>
    </div>
  );
};

export default Homepage;
