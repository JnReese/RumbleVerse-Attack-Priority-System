import Box from "@mui/material/Box";
import { Fragment } from "react";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import AttackPODs from "./attackPODs";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import uniq from "lodash/uniq";
import { moveSet } from "../itemInfo";
import { useState } from "react";

export const attackMulitplier: Record<string, number> = {
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

interface AttackType {
  opponentSelectedAttack: string;
  playerSelectedAttack: string;
}

export default function AttackInformation({ opponentSelectedAttack, playerSelectedAttack }: AttackType) {
  const [badgeCount, setBadgeCount] = useState<number>(0);

  const playerAttackData = moveSet.find((move) => move.name === playerSelectedAttack);
  const opponentAttackData = moveSet.find((move) => move.name === opponentSelectedAttack);
  const _ = require("lodash");
  const multiplier = attackMulitplier[badgeCount];

  return (
    <>
      {playerSelectedAttack || opponentSelectedAttack ? (
        <Container>
          <Paper elevation={3} sx={{ m: 1, width: 500, height: "100%", paddingBottom: "10px", marginBottom: "30px" }}>
            <InfomationLayout>
              {
                <Stack direction="column" spacing={1} alignItems={"center"}>
                  {uniq([playerAttackData, opponentAttackData]).map((attackData: any) => {
                    if (attackData)
                      return (
                        <Fragment key={attackData.name}>
                          <TinyImg
                            src={`${process.env.PUBLIC_URL + attackData?.image.replaceAll(" ", "_") ?? ""}`}
                            alt={attackData?.name}
                            data-testid={attackData?.name}
                          ></TinyImg>
                          {Boolean(attackData.Rarity) && <Chip label={`Rarity : ${attackData.Rarity}`} color="info" />}
                          {Boolean(attackData.viciousDMG) && (
                            <Chip
                              label={`Vicious Damage : ${Math.floor(
                                attackData.viciousDMG! + multiplier * attackData.viciousDMG!
                              )}`}
                              color="error"
                            />
                          )}
                          {Boolean(attackData.thrown) && (
                            <Chip label={`Throw Damage : ${attackData.thrown}`} color="secondary" />
                          )}
                          {Boolean(attackData.dmg) && (
                            <Chip
                              label={`Damage : ${Math.floor(attackData.dmg! + multiplier * attackData.dmg!)}`}
                              color="warning"
                            />
                          )}
                        </Fragment>
                      );
                  })}
                  <AttackPODs setBadgeCount={setBadgeCount} />
                </Stack>
              }
            </InfomationLayout>
            <div>
              <SideNote>* Players start each round with a base 1,000 health</SideNote>
            </div>
          </Paper>
        </Container>
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  width: 500px;
  paddingbottom: 10px;
  marginbottom: 30px;
  height: fit-content;
`;
