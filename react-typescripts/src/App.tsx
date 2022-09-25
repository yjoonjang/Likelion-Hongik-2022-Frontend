import styled, { keyframes } from "styled-components";
import Circle from "./Circle";
import Form from "./Form";

// theme.ts에 존재하는 theme의 bgColor에 접근하여 props로 받아옴
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
// 만약 property에 오타가 생기면 compile과정에서 오류를 리턴
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

// #3.7 recap
// component의 props type defintion을 위한 interface생성
interface DummyProps {
  text: string;
  active?: boolean; // make optional property
}
//props의 type을 {props} : typeInterface의 형태로 지정해줘야 compile시 에러가 뜨지 않는다.
const Dummy = ({ text, active }: DummyProps) => {
  return <H1>{text}</H1>;
};

function App() {
  // react "SyntheticEvent" Docs참고, framework별로 문법이 다르다.
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <>
      <Container>
        {/** component자체에 props 명을  집어넣어 default value를 설정할 수 있다. */}
        <Dummy active text="hello" />
        <button onClick={onClick}>Click me</button>
      </Container>
      <Circle borderColor="black" bgColor="teal" />
      <Circle bgColor="tomato" />
      <Form />
    </>
  );
}

export default App;
