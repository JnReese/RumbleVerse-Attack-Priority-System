import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { moveSet } from "../itemInfo";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface AttackType {
  secondSelectedAttack: string;
  firstSelectedAttack: string;
}

export default function SimplePaper({ secondSelectedAttack, firstSelectedAttack }: AttackType) {
  console.log(firstSelectedAttack, secondSelectedAttack);

  const placeImg = () => {
    let category1 = moveSet.find((move) => move.name === firstSelectedAttack)?.image.replaceAll(" ", "_") ?? "";
    let category2 = moveSet.find((move) => move.name === secondSelectedAttack)?.image.replaceAll(" ", "_") ?? "";
    let rarity1 = moveSet.find((move) => move.name === firstSelectedAttack)?.Rarity;
    let rarity2 = moveSet.find((move) => move.name === secondSelectedAttack)?.Rarity;
    let dmg1 = moveSet.find((move) => move.name === firstSelectedAttack)?.dmg;
    let dmg2 = moveSet.find((move) => move.name === secondSelectedAttack)?.dmg;
    const checkIfSameAttack = () => {
      return category1 === category2;
    };
    if (checkIfSameAttack() || !firstSelectedAttack || !secondSelectedAttack) {
      return (
        <Stack direction="column" spacing={1} width="50%" alignItems={"center"}>
          <TinyImg src={`${process.env.PUBLIC_URL + category1 ? category1 : category2}`}></TinyImg>
          <Chip label={`Rarity : ${rarity1 ? rarity1 : rarity2}`} color="info" />
          <Chip label={`Damage : ${dmg1 ? dmg1 : dmg2}`} color="warning" />
        </Stack>
      );
    } else {
      return (
        <Stack direction="column" spacing={1} width="50%" alignItems={"center"}>
          <TinyImg src={`${process.env.PUBLIC_URL + category1}`}></TinyImg>
          <Chip label={`Rarity : ${rarity1}`} color="info" />
          <Chip label={`Damage : ${dmg1}`} color="warning" />
          <TinyImg src={`${process.env.PUBLIC_URL + category2}`}></TinyImg>
          <Chip label={`Rarity : ${rarity2}`} color="info" />
          <Chip label={`Damage : ${dmg2}`} color="warning" />
        </Stack>
      );
    }
  };
  return (
    <>
      {firstSelectedAttack || secondSelectedAttack ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 500,
              height: "100%",
              flexDirection: "column",
            },
          }}
        >
          <Paper elevation={3}>
            <InfomationLayout>{placeImg()}</InfomationLayout>
            <div>
              <SideNote>* Players start each round with a base 1,000 health</SideNote>
            </div>
          </Paper>
        </Box>
      ) : null}
    </>
  );
}

const TinyImg = styled.img`
  width: 100px;
  margin-left: 10px;
  margin-top: 1em;
`;
const SideNote = styled.span`
  font-style: italic;
`;

const InfomationLayout = styled.div`
  display: flex;
  justify-content: center;
`;
