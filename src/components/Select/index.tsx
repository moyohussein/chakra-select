import {
  BaseThemeTypings,
  Button,
  Flex,
  HTMLChakraProps,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FC, ReactElement, useState } from "react";

interface SelectProps extends HTMLChakraProps<"select"> {
  children?: ReactElement;
  placeholder?: string;
  icon?: ReactElement;
}

const Select: FC<SelectProps> = ({ children, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" width={"max-content"}>
      <Button
        display={"flex"}
        justifyContent={"space-between"}
        gap={6}
        padding={4}
        onClick={() => setIsOpen(!isOpen)}
      >
        {placeholder}
        {icon ? (
          icon
        ) : (
          <Icon
            transform="translate(180deg)"
            transition={"transform 0.5s ease-out"}
            as={ChevronDownIcon}
          />
        )}
      </Button>
      {children && <span>{isOpen && children}</span>}
    </Flex>
  );
};

export default Select;
