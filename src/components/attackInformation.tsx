import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import AttackPODs from "./attackPODs";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { moveSet } from "../itemInfo";
import { useState } from "react";

interface AttackType {
  secondSelectedAttack: string;
  firstSelectedAttack: string;
  playersAttackExists: Boolean;
}

export default function SimplePaper({ secondSelectedAttack, firstSelectedAttack, playersAttackExists }: AttackType) {
  const [badgeCount, setBadgeCount] = useState<number>(0);

  const attackMulitplier: Record<string, number> = {
    0: 0,
    1: 0.1,
    2: 0.2,
    3: 0.3,
    4: 0.4,
    5: 0.6,
    6: 0.7,
    7: 0.8,
    8: 0.9,
    9: 1,
    10: 1.25,
  };

  const placeImg = () => {
    let category1 = moveSet.find((move) => move.name === firstSelectedAttack)?.image.replaceAll(" ", "_") ?? "";
    let category2 = moveSet.find((move) => move.name === secondSelectedAttack)?.image.replaceAll(" ", "_") ?? "";
    let rarity1 = moveSet.find((move) => move.name === firstSelectedAttack)?.Rarity;
    let rarity2 = moveSet.find((move) => move.name === secondSelectedAttack)?.Rarity;
    let dmg1 = moveSet.find((move) => move.name === firstSelectedAttack)?.dmg;
    let dmg2 = moveSet.find((move) => move.name === secondSelectedAttack)?.dmg;
    let viciousDMG1 = moveSet.find((move) => move.name === firstSelectedAttack)?.viciousDMG;
    let viciousDMG2 = moveSet.find((move) => move.name === secondSelectedAttack)?.viciousDMG;
    let throwDMG1 = moveSet.find((move) => move.name === firstSelectedAttack)?.thrown;
    let throwDMG2 = moveSet.find((move) => move.name === secondSelectedAttack)?.thrown;
    let multiplier = attackMulitplier[badgeCount];

    const checkIfSameAttack = () => {
      return category1 === category2;
    };

    if (checkIfSameAttack() || !firstSelectedAttack || !secondSelectedAttack) {
      return (
        <Stack direction="column" spacing={1} width="50%" alignItems={"center"} marginBottom="40px">
          <TinyImg
            src={`${process.env.PUBLIC_URL + category1 ? category1 : category2}`}
            data-testid="attackInfoImg1"
          ></TinyImg>
          {rarity1 || rarity2 ? <Chip label={`Rarity : ${rarity1 ? rarity1 : rarity2}`} color="info" /> : null}
          {viciousDMG1 || viciousDMG2 ? (
            <Chip
              label={`Vicious Damage : ${
                viciousDMG1 ? Math.floor(viciousDMG1 + multiplier * viciousDMG1) : viciousDMG2
              }`}
              color="error"
            />
          ) : null}
          {throwDMG1 || throwDMG2 ? (
            <Chip label={`Throw Damage : ${throwDMG1 ? throwDMG1 : throwDMG2}`} color="secondary" />
          ) : null}
          <Chip label={`Damage : ${dmg1 ? Math.floor(dmg1 + multiplier * dmg1) : dmg2}`} color="warning" />
          <AttackPODs setBadgeCount={setBadgeCount} playersAttackExists={playersAttackExists} />
        </Stack>
      );
    } else {
      return (
        <Stack direction="column" spacing={1} width="50%" alignItems={"center"} marginTop="1em" marginBottom="4em">
          <TinyImg
            src={`${process.env.PUBLIC_URL + category1}`}
            data-testid="attackInfoImg1"
            alt={firstSelectedAttack}
          ></TinyImg>
          {rarity1 ? <Chip label={`Rarity : ${rarity1 ? rarity1 : null}`} color="info" /> : null}
          {viciousDMG1 ? (
            <Chip
              label={`Vicious Damage : ${viciousDMG1 ? Math.floor(viciousDMG1 + multiplier * viciousDMG1) : null}`}
              color="error"
            />
          ) : null}
          {throwDMG1 ? <Chip label={`Throw Damage : ${throwDMG1 ? throwDMG1 : throwDMG2}`} color="secondary" /> : null}
          <Chip label={`Damage : ${dmg1 ? Math.floor(dmg1 + multiplier * dmg1) : dmg1}`} color="warning" />
          <TinyImg
            src={`${process.env.PUBLIC_URL + category2}`}
            data-testid="attackInfoImg2"
            alt={secondSelectedAttack}
          ></TinyImg>
          {rarity2 ? <Chip label={`Rarity : ${rarity2}`} color="info" /> : null}
          {viciousDMG2 ? (
            <Chip
              label={`Vicious Damage : ${viciousDMG2 ? Math.floor(viciousDMG2 + multiplier * viciousDMG2) : null}`}
              color="error"
            />
          ) : null}
          {throwDMG2 ? <Chip label={`Throw Damage : ${throwDMG2 ? throwDMG2 : throwDMG1}`} color="secondary" /> : null}
          <Chip label={`Damage : ${dmg2 ? Math.floor(dmg2 + multiplier * dmg2) : dmg2}`} color="warning" />
          <AttackPODs setBadgeCount={setBadgeCount} playersAttackExists={playersAttackExists} />
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
