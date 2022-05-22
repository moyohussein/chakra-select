import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { extendTheme } from '@chakra-ui/react'

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
const ChakraSelect: ComponentStyleConfig = {
  // All parts of multipart components can be found in the @chakra-ui/anatomy package,
  // the menuAnatomy has as well these parts: button, list, groupTitle, command, divider
  parts: ['select', 'option'],
  baseStyle: {
    select: {
      boxShadow: 'md',
      rounded: 'lg',
      alignItems: 'center',
      px: '4',
      width: 'max-content',
      fontWeight: 'medium',
      color: 'gray.700',
      lineHeight: 'normal',
      _focusWithin: {
        boxShadow: '0 0 0 2px rgba(21, 156, 228, 0.4)'
      },
      _expanded: {
        boxShadow: '0 0 0 2px rgba(21, 156, 228, 0.4)'
      },
      _focus: {
        outline: 'none'
      }
    },
    option: {
      fontWeight: 'medium',
      rounded: 'lg',
      lineHeight: 'normal',
      textAlign: 'left',
      px: '4',
      color: 'gray.500',
      width: '100%',
      _hover:{
        backgroundColor: 'gray.100',
      },
      _focus: {
        outline: 'none',
        backgroundColor: 'gray.300',
      },
      
    },
  },
  sizes: {
    xs: {
      select: {
        fontSize: 'xs',
        py: 1,
      },
      option: {
        fontSize: 'xs',
        py: 1,
      },
    },
    sm: {
      select: {
        fontSize: 'sm',
        py: 1.5,
      },
      option: {
        fontSize: 'sm',
        py: 1.5,
      },
    },
    md: {
      select: {
        fontSize: 'md',
        py: 2,
      },
      option: {
        fontSize: 'md',
        py: 2,
      },
    },
    lg: {
      select: {
        fontSize: 'lg',
        py: 3,
      },
      option: {
        fontSize: 'lg',
        py: 3,
      },
    },
  },
  variants: {
    outline: {
      select: {
        border: '1px solid',
      },
    },
    ghost: {
      select: {
        opacity: 0.5,
      },
    },
    solid: {
      select: {
        bg: 'blue.100',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'ghost',
  },
};

const theme = extendTheme({
  components: {
    ChakraSelect,
  },
})

export default theme