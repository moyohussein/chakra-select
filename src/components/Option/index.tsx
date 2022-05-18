import { Button, HTMLChakraProps } from "@chakra-ui/react";
import { FC } from "react";

interface OptionProps extends HTMLChakraProps<"option"> {
  children?: string;
  label?: string;
}

const Option: FC<OptionProps> = ({ label, children }) => {
  return (
    <Button p={4} py={0} width="100%" textAlign={"left"} variant={"unstyled"}>
      {label || children}
    </Button>
  );
};

export default Option;
