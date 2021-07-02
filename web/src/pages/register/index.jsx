import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';

import apiService from '../../services/apiService';
import { useAuth } from '../../contexts/authContext';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [urlPhoto, setUrlPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid ] = useState(false);
  const { setCurrentUser } = useAuth();
  const toast = useToast();
  const history = useHistory();

  async function signUp(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const signUpResponse = await apiService.post('/signup', {
        name,
        email,
        password,
        urlPhoto,
      });

      if (signUpResponse.data.message === 'usuário autorizado com sucesso') {
        const user = signUpResponse.data.user;
        setCurrentUser(user);
        localStorage.setItem('TOKEN', signUpResponse.data.token);
        history.push('/home');
      }
    } catch (error) {
      if(error.response){
        setIsEmailInvalid(true);
        toast({
          title: error.response.data.message,
          status: 'error',
          isClosable: true,
        });
        setIsLoading(false);
      };
    }
  }

  return (
    <div className="container">
      <div className="registerBox">
        <Box className="title">CRIE SUA CONTA</Box>
        <form
          onSubmit={(e) => {
            signUp(e);
          }}
        >
          <FormControl isRequired>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Nome</FormLabel>
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                variant="filled"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="inputGroup">
              <FormLabel className="loginLabel">Email</FormLabel>
              <Input
                type="email"
                isInvalid={isEmailInvalid}
                placeholder="exemplo@exemplo.com"
                variant="filled"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailInvalid(false);
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
            </div>
          </FormControl>

          <div className="inputGroup">
            <FormLabel className="loginLabel">Url da foto</FormLabel>
            <Input
              type="text"
              placeholder="https://github.com/user-profile.png"
              variant="filled"
              isRequired={false}
              onChange={(e) => {
                setUrlPhoto(e.target.value);
              }}
            />
            <FormControl>
              <FormHelperText className="helperText">
                <Link to="/">
                  Já possui uma conta? Clique aqui para se logar!
                </Link>
              </FormHelperText>
            </FormControl>
          </div>
          <Button colorScheme="whatsapp" type="submit" isLoading={isLoading}>
            Criar
          </Button>
        </form>
      </div>
    </div>
  );
}