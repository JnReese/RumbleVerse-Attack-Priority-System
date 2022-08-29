import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import { useEffect } from "react";

type AttackCount = {
  setBadgeCount: (value: number) => void;
};

export default function AttackPods({ setBadgeCount }: AttackCount) {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    setBadgeCount(count);
  }, [count]);

  return (
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
            aria-label="reduce attack multiplier"
            onClick={() => {
              if (count) {
                setCount(count - 1);
              }
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase attack multiplier"
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
  );
}

const Pod = styled.img`
  width: 60px;
`;

//refactor Box to be a styled div
