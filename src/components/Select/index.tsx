import {
  Box,
  Button,
  Collapse,
  Flex,
  HTMLChakraProps,
  Icon,
  StylesProvider,
  useBoolean,
  useControllableState,
  useMultiStyleConfig,
  useOutsideClick,
  useStyles,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FC, ReactElement, useState, ReactNode, Children, cloneElement, useRef, MutableRefObject } from "react";
import Option from "../Option";
import FocusLock from "../FocusLock";
import { AnimatePresence, motion } from "framer-motion";

interface SelectProps  {
  children?: ReactNode;
  placeholder?: string;
  icon?: ReactElement;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
  value?: string;
  onClick?: (value: string) => void;
}

const Select: FC<SelectProps> = ({ 
  children, 
  placeholder = "Select...", 
  icon, 
  size, 
  variant, 
  onClick,
  value,
  ...rest 
}) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [isOpen, setIsOpen] = useBoolean();
  // const [internalValue, setInternalValue] = useControllableState()
  const styles = useMultiStyleConfig('ChakraSelect', { size, variant })
  const [selected, setSelected] = useState<string | undefined>(value);
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen.off(),
  })

  const changeHandler = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setSelected(target.value);
    setIsOpen.off()
  };
  
  const focusHandler = (event: KeyboardEvent) => {
    const target = event.target as HTMLButtonElement;
    setSelected(target.value);
  };

  const PlaceHolder = (placeholder: string) => {
    return (
      <Option value="">
        {placeholder}
      </Option>
    )
  }

  const getValidChildren = (
    children: ReactNode | ReactNode[],
    validChildren: (
      child: ReactNode,
      index?: number,
      children?: ReactNode[]
    ) => boolean
  ): ReactNode[] => Children.toArray(children).filter(validChildren);

  const renderChildren = getValidChildren(children, (item: ReactNode) =>
    Boolean(item &&
      (item as ReactElement).type &&
      (item as ReactElement).type === Option
    )
  ) as ReactElement[];

  const placeholderValue = renderChildren.filter((child: ReactElement) => 
    child.props.value === selected
  );
  
  const selectedOption = placeholderValue.length === 0 ? 
    placeholder : placeholderValue[0].props.label || placeholderValue[0].props.children;

  const selectedIndex = 
    renderChildren.findIndex((child: ReactElement) => child.props.value === selected
  );
  
  return (
    <Flex 
      direction="column" 
      pos="relative"
      width="100%"
    >
      <Button
        aria-haspopup={"menu"}
        aria-expanded={isOpen}
        display={"flex"}
        width="100%"
        justifyContent={"space-between"}
        gap={6}
        onClick={() => setIsOpen.toggle()}
        __css={styles.select}
        {...rest}
      >
        {selectedOption}
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
      <StylesProvider value={styles}>
        <AnimatePresence>
          {isOpen && children && 
            <FocusLock 
              focusLastOnUnlock
              locked
              open={isOpen}
              initialIndex={selectedIndex === -1 ? 0 : selectedIndex }
              setIsOpen={setIsOpen.off}
            >
              <Flex
                ref={ref}
                direction={"column"}
                position={"absolute"}
                rounded="md"
                bottom="0%"
                gap="2px"
                shadow={"base"}
                width={"100%"}
                transform={"translateY(100%)"}
                py={1}
              >
                {renderChildren.map((child: ReactElement, idx: number) => {
                  return cloneElement(child, {
                    key: idx,
                    selected: Boolean(selected) && selectedIndex === idx,
                    onClick: changeHandler,
                    onFocus: focusHandler,
                  });
                })}
              </Flex>
            </FocusLock>
          }
        </AnimatePresence>
      </StylesProvider>
    </Flex>
  );
};

export default Select;
