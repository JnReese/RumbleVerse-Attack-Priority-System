import "./App.css";
import { moveSet } from "./itemInfo";
import styled from "styled-components";
import AttackComparison from "./components/attackComparison";

function App() {
  return (
    <div className="App">
      <Title>RumbleVerse Attack Priority</Title>
      <Dialog>
        Welcome to the Rumbleverse! This page aids RumbleVerse players in better understanding the Attack Priority
        System. Pick two attacks then I will tell you why one move would beat another.{" "}
      </Dialog>
      <AttackComparison></AttackComparison>

      {moveSet.map((move) => (
        <img src={process.env.PUBLIC_URL + move.image} key={move.image} />
      ))}
    </div>
  );
}

export default App;

const Title = styled.h1``;
const Dialog = styled.h2``;
