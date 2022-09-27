import { useEffect, useState } from 'react';
import {
	Routes,
	Route,
	useParams,
	useLocation,
	useMatch,
	matchPath,
} from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Price from './Price';
import Chart from './Chart';

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
	a {
		display: block;
	}
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
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
	const state = location.state as RouterState;
	const [info, setInfo] = useState<IInfoData>();
	const [priceInfo, setPriceInfo] = useState<IPriceData>();
	const priceMatch = useMatch(`${coinId}/price`);
	const chartMatch = useMatch(`${coinId}/chart`);

	// home을 먼저 들러야 state가 나올 수 있음

	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();

			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();

			setInfo(infoData);
			setPriceInfo(priceData);
			setLoading(false);
		})();
	}, [coinId]);
	/* 
  강의와는 다르게 useParams 뒤에 타입을 안붙여줘도 됨. 
  react-router-dom v6 이상부터는 useParams 쓰는 순간 자동으로 타입이 sting 아니면 undefined로 결정됨.
  */

	return (
		<Container>
			<Header>
				<Title>
					{state?.name ? state.name : loading ? 'Loading...' : info?.name}
				</Title>
			</Header>
			{loading ? <Loader>Loading...</Loader> : null}
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{info?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${info?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Open Source:</span>
							<span>{info?.open_source ? 'Yes' : 'No'}</span>
						</OverviewItem>
					</Overview>
					<Description>{info?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{priceInfo?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{priceInfo?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>

						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Routes>
						<Route path={'price'} element={<Price />} />
						<Route path='chart' element={<Chart />} />
					</Routes>
				</>
			)}
		</Container>
	);
}
export default Coin;
