import "./App.css";
import { moveSet } from "./itemInfo";
import styled from "styled-components";
import AttackComparison from "./components/attackComparison";
import AttackCombos from "./components/attackCombos";

function App() {
  return (
    <OverallContainer>
      <TitleContainer>
        <Title>RumbleVerse Attack Priority</Title>
        <Dialog>Welcome to the Rumbleverse! Select two attacks to find if and why one move would beat another. </Dialog>
      </TitleContainer>
      <AttackComparison />
      <AttackCombos />
    </OverallContainer>
  );
}

export default App;

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap");
  font-family: "Black Han Sans", sans-serif;
  font-size: 50px;
  margin-bottom: 1rem;
  width: 375px;
`;
const Dialog = styled.h2`
  font-size: 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  @media (max-width: 768px) {
    text-align: left;
  }
`;
const OverallContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  @media (max-width: 768px) {
  }
`;
