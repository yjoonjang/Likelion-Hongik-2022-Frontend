import styled from 'styled-components';
// import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from './../api';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    color: ${props=>props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        padding: 20px;
        align-items: center;
        transition: color 0.2s ease-in;
        display:flex;
    }
    &:hover{
        a{
            color: ${props=>props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${props=>props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return(
        <Container>
            <Helmet>
                <title>COIN</title>
            </Helmet>
            <Header>
                <Title>COIN</Title>
            </Header>
            {isLoading ? (
                <Loader>"Loading..."</Loader>
            ) : (
            <CoinList>
                {data?.slice(0,100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={coin}>
                            <Img 
                                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                            />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinList>)}
        </Container>
    );
}

export default Coins;