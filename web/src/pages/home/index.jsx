import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Switch, FormControl, FormLabel } from '@chakra-ui/react';

import Header from '../../components/header';
import RankingGroup from '../../components/ranking-group';

import apiService from '../../services/apiService';

import './styles.css';

export default function Home() {
  const [rank, setRank] = useState([]);
  const [orderByName, setOrderByName] = useState();

  useEffect(() => {
    async function getRanking() {
      try {
        const rankResponse = await apiService.get(
          `/getRanking?orderBy=${orderByName === true ? 'name' : 'score'}`
        );
        setRank(rankResponse.data.ranking);
      } catch (error) {
        console.log(error);
      }
    }
    if (localStorage.getItem('orderBy')) {
      setOrderByName(JSON.parse(localStorage.getItem('orderBy')));
    }
    getRanking();
  }, [orderByName]);

  return (
    <>
      <Header />
      <Container centerContent className="homeContainer">
        <h2 id="rank-title">RANKING</h2>

        <div className="ranking-box">
          <div className="rankHeader">
            <p>Nome</p>
            <p>Pontuação</p>
          </div>
          {rank.map((player, index) => {
            return (
              <RankingGroup
                key={index}
                name={player.player_name}
                srcPhoto={player.photo}
                points={player.scores}
              />
            );
          })}
        </div>
        <FormControl
          display="flex"
          alignItems="center"
          className="switchButtons"
        >
          <FormLabel htmlFor="order-by-name" mb="0">
            Ordenar por nome
          </FormLabel>
          <Switch
            id="order-by-name"
            value={true}
            colorScheme="whatsapp"
            isChecked={orderByName}
            onChange={(e) => {
              const value = orderByName === true ? false : true;
              localStorage.setItem('orderBy', value);
              setOrderByName(value);
            }}
          />
        </FormControl>
        <div className="buttonsContainer">
          <Link to="/play">
            <div className="play">
              <h1>JOGAR</h1>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}
