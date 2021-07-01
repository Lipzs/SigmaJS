import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Container } from "@chakra-ui/react";

import Header from "../../components/header";
import RankingGroup from "../../components/ranking-group";

import apiService from '../../services/apiService'

import "./styles.css";

export default function Home() {

  const [ rank, setRank ] = useState([]);

  async function getRanking() {
    try {
      const rankResponse = await apiService.get('/getRanking');
      setRank(rankResponse.data.ranking);
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getRanking();
  }, [])

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
         {rank.slice(0,5).map(player => {
           return (
            <RankingGroup name={player.player_name} srcPhoto={player.photo} points={player.scores} />
           );
         })}
          
        </div>
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
