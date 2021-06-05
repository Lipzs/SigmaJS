import Routes from './Routes';
import './global/styles.css';
import { ChakraProvider, theme } from '@chakra-ui/react';

const myTheme = {
  ...theme,
  styles: {
    global: {
      body: {
        backgroundColor: '#e3e1e1',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        fontFamily: 'Lato',
      },
    },
  },
};

export default function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <Routes />
    </ChakraProvider>
  );
}
