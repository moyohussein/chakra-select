import { Button, HTMLChakraProps, useStyles } from "@chakra-ui/react";
import { FC } from "react";

interface OptionProps  {
  children?: string;
  label?: string;
  selected?: boolean;
  value: string;
  onClick?: () => void;
  onFocus?: () => void;
}

const Option: FC<OptionProps> = ({ label, selected, children, value, onClick, onFocus, ...props }) => {
  const styles = useStyles();
  return (
    <Button
      aria-selected={selected}
      value={value}
      onClick={onClick}
      onFocus={onFocus}
      __css={styles.option} 
      {...props} 
    >
      {label || children}
    </Button>
  );
};

export default Option;
