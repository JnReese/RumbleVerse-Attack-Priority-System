import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { moveSet } from "../itemInfo";
import { answers, rankItems } from "../answers";

export default function SimplePaper() {
  const [firstSelectedAttack, setFirstSelectedAttack] = useState<string>("");
  const [secondSelectedAttack, setSecondSelectedAttack] = useState<string>("");
  const [attackOutcome, setAttackOutcome] = useState<string>("");

  useEffect(() => {
    if (firstSelectedAttack) {
      let condition = answerLogic();
      console.log(condition);
      if (condition.includes("win")) {
        setAttackOutcome("win");
      }
      if (condition.includes("lose")) {
        setAttackOutcome("lose");
      }
      if (condition.includes("tie")) {
        setAttackOutcome("Tie");
      }
    }
  }, [firstSelectedAttack, secondSelectedAttack]);

  const handleChangeOne = (event: SelectChangeEvent) => {
    setFirstSelectedAttack(event.target.value as string);
  };
  const handleChangeTwo = (event: SelectChangeEvent) => {
    setSecondSelectedAttack(event.target.value as string);
  };

  const moveSetList = () => {
    return moveSet.map((move) => (
      <MenuItem value={move.name} key={move.name}>
        {move.name}
        <TinyImg src={`${process.env.PUBLIC_URL + move.image}`}></TinyImg>
      </MenuItem>
    ));
  };

  console.log(attackOutcome);

  const answerLogic = () => {
    let selectedCategory = moveSet.find((move) => move.name === firstSelectedAttack)?.category.replaceAll(" ", "_");
    let secondSelectedCategory = moveSet
      .find((move) => move.name === secondSelectedAttack)
      ?.category.replaceAll(" ", "_");
    let winningAnswer = answers[`${selectedCategory}_win`];
    let losingAnswer = answers[`${selectedCategory}_lose`];
    let tiedAnswer = answers[`${selectedCategory}_tie`];
    if (firstSelectedAttack === secondSelectedAttack) {
      return tiedAnswer;
    }
    if (firstSelectedAttack && secondSelectedAttack === "") {
      return winningAnswer;
    }
    if (firstSelectedAttack && secondSelectedAttack && selectedCategory && secondSelectedCategory) {
      let rankOne = rankItems[selectedCategory];
      let rankTwo = rankItems[secondSelectedCategory];
      if (rankOne === rankTwo) {
        return tiedAnswer;
      }
      if (rankOne < rankTwo) {
        return losingAnswer;
      }
      if (rankOne > rankTwo) {
        return winningAnswer;
      }
    }
    if (secondSelectedAttack && firstSelectedAttack === "") {
      return "Enter a plater attack to compare";
    } else {
      return "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 500,
          height: "100%",
          paddingBottom: "10px",
        },
      }}
    >
      <Paper elevation={3}>
        <Box sx={{ minWidth: 150, marginTop: "20px" }}>
          <PlayersAttackText>Players Attack</PlayersAttackText>
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
          <PlayersAttackText>Opponents Attack</PlayersAttackText>
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
              <Answer>{answerLogic()}</Answer>
            </Paper>
          ) : null}
        </Box>
      </Paper>
    </Box>
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
`;
