import Paper from "@mui/material/Paper";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { IoMdArrowDropright } from "react-icons/io";
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

  const determineComboDmgRange = (baseComboDmg: number) => {
    console.log(baseComboDmg);

    const startText = ["Combos lowest damage output :", "Combos damage with maxed attack pods :"];
    return (
      <>
        <p>{`${startText[0]} ${baseComboDmg}`}</p>
        <p>{`${startText[1]} ${Math.floor(baseComboDmg + 1.25 * baseComboDmg)}`}</p>
      </>
    );
  };

  const moveListRender = (combo: string[], hasDropdown: boolean) => {
    let lastItem = combo.at(-1);
    console.log(lastItem);

    const shouldRenderArrow = (idx: number) => (idx === combo.length - 1 ? hasDropdown : true);

    return (
      <ComboString>
        {combo.map((move, idx) => (
          <>
            <p>{move}</p>
            {shouldRenderArrow(idx) && <IoMdArrowDropright />}
          </>
        ))}
      </ComboString>
    );
  };

  const calculateLowestTotalComboDamage = (allMoves: string[]) => {
    let damageTotal = 0;
    allMoves.forEach((move) => {
      const moveData = moveSet.find((m) => m.name === move);
      damageTotal += moveData?.dmg ?? 0;
    });
    return damageTotal;
  };

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
        {comboAttacks.map((combo) => (
          <InnerContainer key={combo.name}>
            <Divider>
              <Chip label={combo.name} color="success" sx={{ marginBottom: "10px" }} />
            </Divider>
            <ComboTextConatiner>
              {moveListRender(combo.sequence, Boolean(combo.isSelectable))}
              {Boolean(moves[combo.name]) && <SelectedMove>{moves[combo.name].value}</SelectedMove>}
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
                      {moveSet.map((move) => (
                        <MenuItem value={move.name} key={move.name}>
                          {move.name} <TinyPic src={`${process.env.PUBLIC_URL + move.image}`} alt="" />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : null}
            </ComboTextConatiner>

            <ComboDMG>
              {determineComboDmgRange(
                calculateLowestTotalComboDamage([
                  ...combo.sequence,
                  ...(moves[combo.name]?.value ? [moves[combo.name]?.value] : []),
                ])
              )}
            </ComboDMG>
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
const ComboTextConatiner = styled.div`
  display: flow-root;
  justify-content: center;
`;
const ComboDMG = styled.div`
  display: flex;
  flex-direction: column;
`;
const ComboString = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgoldenrodyellow;
`;
const SelectedMove = styled.p`
  background-color: lightgoldenrodyellow;
`;
