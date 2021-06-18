import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Box
} from '@chakra-ui/react';

import './styles.css';

export default function Login() {
  return (
    <div className="container">
      <div className="loginBox">
        <Box className="title">LOGIN</Box>
        <FormControl isRequired>
          <div className="inputGroup">
            <FormLabel className="loginLabel">Email</FormLabel>
            <Input type="email" placeholder="exemplo@exemplo.com"/>
          </div>
          <div className="inputGroup">
            <FormLabel className="loginLabel">Senha</FormLabel>
            <Input type="password" placeholder="Digite sua senha" />
            <FormHelperText className="helperText">
              <Link to="/register">Não possui uma conta? Crie uma agora!</Link>
            </FormHelperText>
          </div>
          <Button colorScheme="whatsapp">Entrar</Button>
        </FormControl>
      </div>
    </div>
  );
}
