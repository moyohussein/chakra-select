import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

type Dict = Record<string, any>;

const customTheme = {
  ...baseTheme,
  components: {
    ...baseTheme.components,
    Button: {
      baseStyle: baseTheme.components.Button.baseStyle,
      defaultProps: baseTheme.components.Button.defaultProps,
      sizes: {
        md: baseTheme.components.Button.sizes.md,
      },
      variants: {
        primary: () => {
          const defaultStyle = baseTheme.components.Button.variants.solid;
          return {
            ...defaultStyle,
            bg: "blue.900",
          };
        },
      },
    },
  },
};

const theme = extendTheme(customTheme);

export default theme;
