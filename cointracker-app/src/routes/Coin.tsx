import {
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
  Outlet,
} from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo } from "../api";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  font-weight: 300;
  line-height: 134%;
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

// react-router-dom-v6 location and state
interface ITag {
  coin_counter: number;
  ico_count: number;
  id: string;
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

interface RouteParms{
  coinId: string;
}

interface RouteState {
  state: { id: string; name: string };
}

function Coin() {
  const { state } = useLocation() as RouteState; 
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const {isLoading : infoLoading, data:infodata } = useQuery<IInfoData>(["info",coinId], ()=> fetchCoinInfo(coinId!));
  const {isLoading : tickersLoading, data:tickersdata } = useQuery<IPriceData>(["ticker",coinId], ()=> fetchCoinTickers(coinId!));
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infodata ?.name}
        </Title>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infodata?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infodata?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infodata?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infodata?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersdata?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersdata?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Routes>
                <Route path="/price" element={<Price />} />
              </Routes>
              Price
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Routes>
                <Route path="/chart" element={<Chart />} />
              </Routes>
              Chart
            </Tab>
          </Tabs>
        </>
      )}
    </Container>
  );
}

export default Coin;
