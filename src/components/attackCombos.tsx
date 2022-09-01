import Paper from "@mui/material/Paper";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { comboAttacks } from "../itemInfo";
import { moveSet } from "../itemInfo";

interface InputData {
  value: string;
}

export default function AttackCombos() {
  const defaultSelectValues = comboAttacks.filter((combo) => combo.isSelectable);
  const [moves, setMoves] = useState<Record<string, InputData>>({
    "Wall Whiped": { value: "" },
    Misted: { value: "" },
    "Lil Whip": { value: "" },
    "Dolphin Drived": { value: "" },
    "Cuts Deep": { value: "" },
    "Dazed Chop": { value: "" },
  });

  const determineComboDmgRange = (baseComboDmg: number[]) => {
    let highest = baseComboDmg.map((damage) => damage * 1.25);
    return `Combo's lowest damage output ${baseComboDmg.reduce((partialSum, a) => partialSum + a, 0)} 
    Combos highest damage output ${highest.reduce((partialSum, a) => partialSum + a, 0)}`;
  };

  const calculateLowestTotalComboDamage = (combo: string) => {
    let wordsInString = combo.split(">");
    let trimmedWords = wordsInString.map((word) => word.trim());

    if (trimmedWords.includes("ANY" || "ANY GRAB")) {
      // place selected attack or grab into trimmmed words array
    }
    let matchedAttacks = moveSet.filter((move) => trimmedWords.map((word) => word).includes(move.name));
    return matchedAttacks.map((attack) => attack.dmg);
  };

  const replaceArrowWithElement = (text: string) => {};

  const handleChange = (event: SelectChangeEvent, inputName: string) => {
    setMoves({ ...moves, [inputName]: { value: event.target.value } });
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ m: 1, width: 500, height: "100%", paddingBottom: "10px", marginBottom: "30px", paddingTop: "10px" }}
      >
        <h1> Combos (ง •̀_•́)ง</h1>
        {comboAttacks.map((combo, idx) => (
          <InnerContainer key={combo.name}>
            <Divider>
              <Chip label={combo.name} />
            </Divider>
            <p>{combo.sequence}</p>
            {combo.isSelectable ? (
              <div>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="moveSelect">Move</InputLabel>
                  <Select
                    labelId="moveSelect"
                    id="comboMoveSelect"
                    value={moves[combo.name].value}
                    onChange={(e) => handleChange(e, combo.name)}
                    autoWidth
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Jab">Jab</MenuItem>
                    <MenuItem value="Jab Two">Jab Two</MenuItem>
                    <MenuItem value="Jab Three">Jab Three</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : null}

            <p>{`${determineComboDmgRange(calculateLowestTotalComboDamage(combo.sequence))}`}</p>
          </InnerContainer>
        ))}
      </Paper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  width: 500px;
  padding-bottom: 10px;
  margin-bottom: 30px;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TinyPic = styled.img`
  width: 40px;
  height; 40px
`;
