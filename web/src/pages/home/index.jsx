import React from 'react'
import Header from '../../components/header';
import { Container } from '@chakra-ui/react'

import './styles.css'

export default function Home(){
  return(
    <>
      <Header />
      <Container centerContent className="homeContainer">
        <div className="buttonsContainer">
          <div className="play">
            <h1>JOGAR</h1>
          </div>
          <div className="rank">
            <h1>RANKING</h1>
          </div>
        </div>
      </Container>
    </>
  );
}