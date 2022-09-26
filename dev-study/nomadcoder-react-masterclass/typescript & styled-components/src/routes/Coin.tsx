import { useParams } from "react-router";

// interface RouteParams {
//   coinId: string;
// }

function Coin() {
  const { coinId } = useParams();
  /* 
  강의와는 다르게 useParams 뒤에 타입을 안붙여줘도 됨. 
  react-router-dom v6 이상부터는 useParams 쓰는 순간 자동으로 타입이 sting 아니면 undefined로 결정됨.
  */

  return <h1>Coin: {coinId}</h1>;
}
export default Coin;