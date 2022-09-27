import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import styled from 'styled-components';
// interface RouteParams {
//   coinId: string;
// }
const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
`;

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
interface RouterState {
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

function Coin() {
	const { coinId } = useParams();
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const name = location.state as RouterState;
	const [info, setInfo] = useState<IInfoData>();
	const [priceInfo, setPriceInfo] = useState<IPriceData>();

	// home을 먼저 들러야 state가 나올 수 있음

	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			console.log(infoData);
			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			console.log(priceData);

			setInfo(infoData);
			setPriceInfo(priceData);
		})();
	}, []);
	/* 
  강의와는 다르게 useParams 뒤에 타입을 안붙여줘도 됨. 
  react-router-dom v6 이상부터는 useParams 쓰는 순간 자동으로 타입이 sting 아니면 undefined로 결정됨.
  */

	return (
		<Container>
			<Header>
				<Title>{name?.name || 'Loading..'}</Title>
			</Header>
			{loading ? <Loader>Loading...</Loader> : null}
		</Container>
	);
}
export default Coin;
