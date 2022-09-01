import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";
import AttackInformation from "./attackInformation";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { moveSet } from "../itemInfo";
import { answers, rankItems } from "../answers";

export const fightOutcome = (
  playerSelectedAttack?: string,
  opponentSelectedAttack?: string
): undefined | { outcomeInfo: string; fightOutcome: string } => {
  if (!playerSelectedAttack && !opponentSelectedAttack) return undefined;

  let category1 = moveSet.find((move) => move.name === playerSelectedAttack)?.category.replaceAll(" ", "_") ?? "";
  let category2 = moveSet.find((move) => move.name === opponentSelectedAttack)?.category.replaceAll(" ", "_") ?? "";

  let rank1 = rankItems[category1];
  let rank2 = rankItems[category2];

  const checkIsTie = () => {
    return rank1 === rank2 || playerSelectedAttack === opponentSelectedAttack;
  };

  const checkIsWin = () => {
    return !opponentSelectedAttack || rank1 > rank2;
  };
  let isWin = !checkIsTie() && checkIsWin();
  let isTie = checkIsTie();

  const outcomeStatus = () => {
    if (isWin) {
      return "win";
    } else if (isTie) {
      return "tie";
    } else {
      return "lose";
    }
  };

  return {
    fightOutcome: outcomeStatus(),
    outcomeInfo: answers[`${category1}_${outcomeStatus()}`],
  };
};

console.log(fightOutcome(undefined, "Chokeslam")?.outcomeInfo);

export default function AttackComparison() {
  const [playerSelectedAttack, setPlayerSelectedAttack] = useState<string>("");
  const [opponentSelectedAttack, setOpponentSelectedAttack] = useState<string>("");
  const [attackOutcome, setAttackOutcome] = useState<string>();
  const [outcomeInfo, setOutcomeInfo] = useState<string>();

  const handleChangePlayerAttack = (event: SelectChangeEvent) => {
    setPlayerSelectedAttack(event.target.value as string);
  };

  const handleChangeOpponentAttack = (event: SelectChangeEvent) => {
    setOpponentSelectedAttack(event.target.value as string);
  };

  useEffect(() => {
    const outCome = fightOutcome(playerSelectedAttack, opponentSelectedAttack);
    setAttackOutcome(outCome?.fightOutcome);
    setOutcomeInfo(outCome?.outcomeInfo);
  }, [playerSelectedAttack, opponentSelectedAttack]);

  return (
    <Container>
      <InnerContainer>
        <Paper elevation={3} sx={{ m: 1, width: 500, height: "100%", paddingBottom: "10px", marginBottom: "30px" }}>
          <PlayerAttackContainer>
            <PlayersAttackText>Player's Attack 🤜</PlayersAttackText>
            <FormControl sx={{ minWidth: 170 }}>
              <InputLabel id="player-attack">Player Attack </InputLabel>
              <Select
                labelId="player-attack"
                value={playerSelectedAttack}
                label="Player's Attack"
                onChange={handleChangePlayerAttack}
              >
                {moveSet.map((move) => (
                  <MenuItem value={move.name} key={move.name}>
                    {move.name}
                    <TinyImg src={`${process.env.PUBLIC_URL + move.image}`} alt="" />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Verses>VS</Verses>
          </PlayerAttackContainer>
          <OpponentAttackContainer>
            <PlayersAttackText>🤛 Opponent's Attack </PlayersAttackText>
            <FormControl sx={{ minWidth: 170, marginBottom: "20px" }}>
              <InputLabel id="opponent-attack">Opponent Attack</InputLabel>
              <Select
                labelId="opponent-attack"
                value={opponentSelectedAttack}
                label="Opponent's Attack"
                onChange={handleChangeOpponentAttack}
              >
                {moveSet.map((move) => (
                  <MenuItem value={move.name} key={move.name}>
                    {move.name}
                    <TinyImg src={`${process.env.PUBLIC_URL + move.image}`} alt="" />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {Boolean(playerSelectedAttack) && <Outcome>{`Fight Outcome: ${attackOutcome}`}</Outcome>}
            {playerSelectedAttack || opponentSelectedAttack ? (
              <Paper
                elevation={3}
                sx={{ width: "75%", display: "flex", justifyContent: "center", padding: 2, margin: "0 auto" }}
              >
                {!playerSelectedAttack && opponentSelectedAttack ? (
                  <Answer>Please enter a player attack to compare</Answer>
                ) : (
                  <Answer>{outcomeInfo}</Answer>
                )}
              </Paper>
            ) : null}
          </OpponentAttackContainer>
        </Paper>
      </InnerContainer>
      <AttackInformation
        playerSelectedAttack={playerSelectedAttack}
        opponentSelectedAttack={opponentSelectedAttack}
      ></AttackInformation>
    </Container>
  );
}

const TinyImg = styled.img`
  width: 40px;
  margin-left: 10px;
`;
const Answer = styled.div`
  width: 40px;
  margin-left: 10px;
  width: 90%;
`;
const Verses = styled.div`
  margin-top: 1rem;
  font-size: x-large;
  font-weight: 600;
`;
const PlayersAttackText = styled.div`
  margin-top: 1rem;
  font-size: x-large;
  font-weight: 600;
  margin-bottom: 1em;
`;
const Outcome = styled.div`
  margin-top: 1rem;
  font-size: x-large;
  font-weight: 600;
  margin-bottom: 1em;
  text-transform: capitalize;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  width: 500px;
  paddingbottom: 10px;
  marginbottom: 30px;
  height: fit-content;
`;

const PlayerAttackContainer = styled.div`
  min-width: 150px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const OpponentAttackContainer = styled.div`
  min-width: 150px;
  margintop: 20px;
`;
