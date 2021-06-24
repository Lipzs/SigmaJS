import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import apiService from '../../services/apiService';

import { Link, useHistory } from 'react-router-dom';
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
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const history = useHistory();
  const { setCurrentUser } = useAuth();

  async function submitLogin(e) {
    try {
      e.preventDefault()
      setIsSubmitting(true);
      const loginResponse = await apiService.post('/login', {
        email,
        password,
      });

      const user = loginResponse.data.user;
      setCurrentUser(user);
      sessionStorage.setItem('user', user);
      history.push('/home');
    } catch (error) {
      console.log(error);
      // TODO -> Fazer lógica de erro
    }
  }

  return (
    <div className="container">
      <div className="loginBox">
        <Box className="title">LOGIN</Box>
        <form action="" onSubmit={(e) => {submitLogin(e)}}>
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
            <Button type="submit" colorScheme="whatsapp" isLoading={isSubmitting}>
              Entrar
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
}
