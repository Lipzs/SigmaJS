import Routes from './Routes';
import AuthProvider from './contexts/authContext';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './global/styles.css';

const myTheme = {
  ...theme,
  styles: {
    global: {
      body: {
        backgroundColor: '#8EE4AF',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        fontFamily: 'Lato',
      },
    },
  },
};

export default function App() {

  const user = localStorage.getItem('user');

  return (
    <AuthProvider user={JSON.parse(user)} >
      <ChakraProvider theme={myTheme}>
        <Routes />
      </ChakraProvider>
    </AuthProvider>
  );
}
