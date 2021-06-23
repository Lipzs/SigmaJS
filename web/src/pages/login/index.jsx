import React, { useState } from 'react';
import { login } from '../../services/auth';
import apiService from '../../services/apiService';

import { Link } from 'react-router-dom';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Box,
} from '@chakra-ui/react';

import './styles.css';

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function submitLogin() {
    try {
      const loginResponse = await apiService.post('/login', {
        email,
        password,
      });
      login(loginResponse.data.token);
      props.history.push('/home');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="loginBox">
        <Box className="title">LOGIN</Box>
        <FormControl isRequired>
          <div className="inputGroup">
            <FormLabel className="loginLabel">Email</FormLabel>
            <Input
              type="email"
              placeholder="exemplo@exemplo.com"
              variant="filled"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inputGroup">
            <FormLabel className="loginLabel">Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              variant="filled"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormHelperText className="helperText">
              <Link to="/register">Não possui uma conta? Crie uma agora!</Link>
            </FormHelperText>
          </div>
          <Button
            colorScheme="whatsapp"
            onClick={() => {
              submitLogin();
            }}
          >
            Entrar
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
