import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import { useState, useEffect } from "react";

type AttackCount = {
  setBadgeCount: (value: number) => void;
  playersAttackExists: Boolean;
};

export default function BadgeVisibility({ setBadgeCount, playersAttackExists }: AttackCount) {
  const [count, setCount] = React.useState(0);
  const [invisible, setInvisible] = React.useState(false);

  useEffect(() => {
    setBadgeCount(count);
  }, [count]);

  return (
    <>
      {playersAttackExists ? (
        <Box
          sx={{
            color: "action.active",
            display: "flex",
            flexDirection: "column",
            "& > *": {
              marginBottom: 2,
            },
            "& .MuiBadge-root": {
              marginRight: 4,
            },
          }}
        >
          <div>
            <Badge color="secondary" badgeContent={count} sx={{ marginTop: "1em" }}>
              <Pod src={`${process.env.PUBLIC_URL + "/otherImgs/Stat_Pod_Attack.png"}`} alt="attack multiplier" />
            </Badge>
            <ButtonGroup>
              <Button
                aria-label="reduce"
                onClick={() => {
                  if (count) {
                    setCount(Math.max(count - 1, 0));
                  }
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  if (count < 10) {
                    setCount(count + 1);
                  }
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </div>
        </Box>
      ) : null}
    </>
  );
}

const Pod = styled.img`
  width: 60px;
`;
