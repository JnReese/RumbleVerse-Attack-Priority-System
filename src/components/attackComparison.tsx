import * as React from "react";
import Box from "@mui/material/Box";
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

export default function SimplePaper() {
  const [firstSelectedAttack, setFirstSelectedAttack] = useState<string>("");
  const [secondSelectedAttack, setSecondSelectedAttack] = useState<string>("");
  const [attackOutcome, setAttackOutcome] = useState<string>();
  const [outcomeInfo, setOutcomeInfo] = useState<string>();
  const [playersAttackExists, setPlayerAtackExists] = useState<Boolean>(false);

  const handleChangeOne = (event: SelectChangeEvent) => {
    setFirstSelectedAttack(event.target.value as string);
  };
  const handleChangeTwo = (event: SelectChangeEvent) => {
    setSecondSelectedAttack(event.target.value as string);
  };

  useEffect(() => {
    const outCome = fightOutcome();
    setAttackOutcome(outCome?.fightOutcome);
    setOutcomeInfo(outCome?.outcomeInfo);
    setPlayerAtackExists(Boolean(firstSelectedAttack));
  }, [firstSelectedAttack, secondSelectedAttack]);

  const moveSetList = () => {
    return moveSet.map((move) => (
      <MenuItem value={move.name} key={move.name}>
        {move.name}
        <TinyImg src={`${process.env.PUBLIC_URL + move.image}`} alt=""></TinyImg>
      </MenuItem>
    ));
  };

  const fightOutcome = (): undefined | { outcomeInfo: string; fightOutcome: string } => {
    if (!firstSelectedAttack && !secondSelectedAttack) return undefined;

    let category1 = moveSet.find((move) => move.name === firstSelectedAttack)?.category.replaceAll(" ", "_") ?? "";
    let category2 = moveSet.find((move) => move.name === secondSelectedAttack)?.category.replaceAll(" ", "_") ?? "";

    let rank1 = rankItems[category1];
    let rank2 = rankItems[category2];

    const checkIsTie = () => {
      return rank1 === rank2 || firstSelectedAttack === secondSelectedAttack;
    };

    const checkIsWin = () => {
      return !secondSelectedAttack || rank1 > rank2;
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

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: "100%",
            paddingBottom: "10px",
            marginBottom: "30px",
          },
        }}
      >
        <Paper elevation={3}>
          <Box sx={{ minWidth: 150, marginTop: "20px", marginBottom: "40px" }}>
            <PlayersAttackText>Players Attack 🤜</PlayersAttackText>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="demo-simple-select-label">Attack </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={firstSelectedAttack}
                label="Attack 1"
                onChange={handleChangeOne}
              >
                {moveSetList()}
              </Select>
            </FormControl>
            <Verses>VS</Verses>
          </Box>
          <Box sx={{ minWidth: 150, marginTop: "20px" }}>
            <PlayersAttackText>🤛 Opponents Attack </PlayersAttackText>
            <FormControl sx={{ minWidth: 100, marginBottom: "20px" }}>
              <InputLabel id="demo-simple-select-label">Attack</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={secondSelectedAttack}
                label="Attack 2"
                onChange={handleChangeTwo}
              >
                {moveSetList()}
              </Select>
              {firstSelectedAttack ? <Outcome>Fight Outcome: {attackOutcome}</Outcome> : null}
            </FormControl>
            {firstSelectedAttack || secondSelectedAttack ? (
              <Paper
                elevation={3}
                sx={{ width: "75%", display: "flex", justifyContent: "center", padding: 2, margin: "0 auto" }}
              >
                {!firstSelectedAttack && secondSelectedAttack ? (
                  <Answer>Please enter a player attack to compare</Answer>
                ) : (
                  <Answer>{outcomeInfo}</Answer>
                )}
              </Paper>
            ) : null}
          </Box>
        </Paper>
      </Box>
      <AttackInformation
        firstSelectedAttack={firstSelectedAttack}
        secondSelectedAttack={secondSelectedAttack}
        playersAttackExists={playersAttackExists}
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
