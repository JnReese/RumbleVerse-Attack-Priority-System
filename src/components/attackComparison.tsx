import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { moveSet } from "../itemInfo";

export default function SimplePaper() {
  const [firstSelectedAttack, setFirstSelectedAttack] = useState<string>("");
  const [secondSelectedAttack, setSecondSelectedAttack] = useState<string>("");
  const [name, setName] = React.useState("");

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
      </MenuItem>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 500,
          height: 500,
        },
      }}
    >
      <Paper elevation={3}>
        <Box sx={{ minWidth: 150, marginTop: "20px" }}>
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
          <div>VS</div>
        </Box>
        <Box sx={{ minWidth: 150, marginTop: "20px" }}>
          <FormControl sx={{ minWidth: 100 }}>
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
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}
