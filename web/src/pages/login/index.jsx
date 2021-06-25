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
  useToast,
} from '@chakra-ui/react';

import './styles.css';

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserInvalid, setIsUserInvalid] = useState(false);
  const toast = useToast();

  const history = useHistory();
  const { setCurrentUser } = useAuth();

  async function submitLogin(e) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const loginResponse = await apiService.post('/login', {
        email,
        password,
      });

      const user = loginResponse.data.user;
      setCurrentUser(user);
      localStorage.setItem('TOKEN', loginResponse.data.token);
      history.push('/home');
    } catch (error) {
      if (error.response) {
        setIsUserInvalid(true);
        toast({
          title: `Email ou senha incorretos`,
          status: 'error',
          isClosable: true,
        });
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="loginBox">
        <Box className="title">LOGIN</Box>
        <form
          action=""
          onSubmit={(e) => {
            submitLogin(e);
          }}
        >
          <FormControl isRequired>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Email</FormLabel>
              <Input
                type="email"
                placeholder="exemplo@exemplo.com"
                variant="filled"
                isInvalid={isUserInvalid}
                onChange={(e) => {
                  setIsUserInvalid(false);
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
                isInvalid={isUserInvalid}
                onChange={(e) => {
                  setIsUserInvalid(false);
                  setPassword(e.target.value);
                }}
              />
              <FormHelperText className="helperText">
                <Link to="/register">
                  Não possui uma conta? Crie uma agora!
                </Link>
              </FormHelperText>
            </div>
            <Button
              type="submit"
              colorScheme="whatsapp"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
}
