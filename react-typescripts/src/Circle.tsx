import styled from "styled-components";

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `hello ${playerObj.name} you are ${playerObj.age} years old.`;

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  &:hover {
    background-color: aqua;
  }
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  console.log(sayHello({ name: "nico", age: 21 }));
  return <Container bgColor={bgColor} borderColor={borderColor ?? "white"} />;
}

export default Circle;
