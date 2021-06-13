import React from 'react';
import { Link } from 'react-router-dom'
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button
} from '@chakra-ui/react';

import './styles.css';

export default function Login() {
  return (
    <div className="loginBox">
      <FormControl isRequired>
        <div className="inputGroup">
          <FormLabel className="loginLabel">Email</FormLabel>
          <Input type="email" />
        </div>
        <div className="inputGroup">
          <FormLabel className="loginLabel">Senha</FormLabel>
          <Input type="password" />
          <FormHelperText className="helperText">
            <Link>
              Não possui uma conta? Crie uma agora!
            </Link>
          </FormHelperText>
        </div>
        <Button className="loginButton">Entrar</Button>
      </FormControl>
    </div>
  );
}
