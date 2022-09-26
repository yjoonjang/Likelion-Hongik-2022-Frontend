import styled, { keyframes } from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const rotationAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    border-radius:100px;
  }
  100%{
    transform:rotate(360deg);
    border-radius:0px;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
  width: 30px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;
  ${Emoji}:hover {
    font-size: 98px;
  }
  background-color: ${(props) => props.theme.backgroundColor};
`;

interface DummyProps {
  text: string;
  active?: boolean; 
}

function Dummy({text, active = false} : DummyProps) {
   return <h1>{text} </h1>
}

function App() {
  const onClick = (event: React.FormEvent<HTMLButtonElement >) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    
  }

  return (
    <Wrapper>
      <Dummy text= 'hello' />
      <form>
        <button value='ho' onClick={onClick}>click me </button>
      </form>
    </Wrapper>
  );
}

export default App;
