import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: ${(props) => props.theme.accentColor};
`;


// react-router-dom-v6 location and state
interface ITag {
  coin_counter : number;
  ico_count : number;
  id : string;
  name : string;
}

interface IInfoData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new : boolean;
  is_active : boolean;
  type : string;
  logo : string;
  tags : ITag[];
  description : string;
  message : string;
  open_source : boolean;
  started_at : string;
  development_status :string;
  hardware_wallet :boolean ;
  proof_type : string;
  org_structure : string;
  hash_algorithm : string; 
  first_data_at : string;
  last_data_at : string;
}


interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface RouteState {
  state: { id : string; name: string };
}

function Coin() {
  const [isLoaded ,setLoading] = useState<Boolean>(true);
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
 

    // axios를 이용한 data response
    const getCoinDetailAPI = async () => {
      const info_res = await axios.get(`https://api.coinpaprika.com/v1/coins/${state.id}`);
      setInfo(info_res.data);
      const price_res =  await axios(`https://api.coinpaprika.com/v1/tickers/${state.id}`);
      setPriceInfo(price_res.data);
      setLoading(false);
    };
  
    useEffect(() => {
      getCoinDetailAPI(); 
    }, []);
    // coinId never gonna change 


  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {isLoaded ? "Loading..." : info?.name}
    </Container>
  );
}

export default Coin;
