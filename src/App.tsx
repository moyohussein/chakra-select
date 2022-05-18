import { ReactNode, useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'

function App(children: ReactNode) {

  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  )
}

export default App
