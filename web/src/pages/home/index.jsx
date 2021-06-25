import React from "react";
import Header from "../../components/header";
import { Container } from "@chakra-ui/react";
import RankingGroup from "../../components/ranking-group";

import "./styles.css";

export default function Home() {
  return (
    <>
      <Header />
      <Container centerContent className="homeContainer">
        <h2 id="rank-title">RANKING</h2>
        <div class="ranking-box">
          <RankingGroup></RankingGroup>
          <RankingGroup></RankingGroup>
          <RankingGroup></RankingGroup>
          <RankingGroup></RankingGroup>
          <RankingGroup></RankingGroup>
        </div>
        <div className="buttonsContainer">
          <div className="play">
            <h1>JOGAR</h1>
          </div>
        </div>
      </Container>
    </>
  );
}
