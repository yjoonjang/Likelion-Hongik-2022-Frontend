import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";

interface RouteState {
  name : string;
 }

//API로부터 Data를 fetch해오기 위한 인터페이스
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  max-width: 480px;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 0px 4rem;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  a {
    display: flex;
    align-items: center;
    padding: 2rem;
    transition: color 100ms ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 8rem;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
  margin-right: 0.6rem;
  width: 24px;
  height: 24px;
`;

function Coins() { 
  const {isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : ( 
        <CoinsList>
          {data?.slice(0,40).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                ></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;