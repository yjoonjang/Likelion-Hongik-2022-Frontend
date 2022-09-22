import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
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

const Wrapper = styled.div`
  display: flex;
`;

const Emoji = styled.span`
  font-size:36px;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  animation:${rotateAnimation} 1s linear infinite;
  /* target for child */
  ${Emoji}{ 
    /** pseudo selector */
    &:hover{
      font-size: 40px;
    }
    &:active{
      opacity: 0;
    }
  }
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color:white;
  background-color:tomato;
  border:0;
  border-radius:15px;
`;

// const Input = styled.input.attrs({required : true, maxLength:10})`
//   background-color: tomato;
// `;

function App() {
  return (
    <Wrapper>
      <Box bgColor="teal">
        <Emoji>🤩</Emoji>
      </Box>
      <Circle bgColor="tomato"></Circle>
      {/* <Btn as="a" href="/">Login</Btn> */}
      <Btn>Login</Btn>
      <Btn>LogOut</Btn>
    </Wrapper>
  );
}

export default App;
