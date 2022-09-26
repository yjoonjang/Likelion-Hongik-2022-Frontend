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

function Coin() {
	const { coinId } = useParams();
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const name = location.state as RouterState;
	const [info, setInfo] = useState({});
	const [priceInfo, setPriceInfo] = useState({});

	// home을 먼저 들러야 state가 나올 수 있음

	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			// console.log(res);
			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
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
