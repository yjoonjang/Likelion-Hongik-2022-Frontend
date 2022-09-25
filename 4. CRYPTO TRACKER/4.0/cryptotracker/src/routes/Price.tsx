import { useQuery } from 'react-query';
import { fetchCoinTickers } from './../api';
import styled, { keyframes } from 'styled-components';

interface IChart{
  coinId: string;
}

interface IUSDData{
  quotes: {
      USD:{
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
      }
  };
}

const fadeInNSlideUp = keyframes`
  from{
    opacity:0;
    transform: translateY(200px);
  }
  to{
    opacity: 1;
  }
`;

const PriceLists = styled.ul`
  display: block;
  text-align: center;
  background-color: #3f3671;
  border-radius: 10px;
  padding: 8px;
  font-weight: 400;
  margin-bottom: 25px;
  animation: ${fadeInNSlideUp};
  animation-duration: 0.7s;
`;


function Price({coinId}:IChart) {
    const {isLoading, data} = useQuery<IUSDData>(
      ["USD", coinId],
      ()=>fetchCoinTickers(coinId),
      {
        refetchInterval: 10000,
      }
    );
    return(
      <div>
        {isLoading ? (
          "Loading price..."
        ):(
          <>
            <PriceLists>
            price: {data?.quotes.USD.price.toFixed(2)}
            </PriceLists>
            <PriceLists>
            ath_price: {data?.quotes.USD.ath_price.toFixed(2)}
            </PriceLists>
            <PriceLists>
            market_cap: {data?.quotes.USD.market_cap.toFixed(2)}
            </PriceLists>
            <PriceLists>
            volume_24h: {data?.quotes.USD.volume_24h.toFixed(2)}
            </PriceLists>
            <PriceLists>
            percent_change_1d: {data?.quotes.USD.percent_change_24h.toFixed(2)}
            </PriceLists>
          </>
        )
        }
      </div>
    )
  }
  
  export default Price;