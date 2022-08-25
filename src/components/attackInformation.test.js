import { render, screen } from "@testing-library/react";
import AttackInformation from "./attackInformation";
import { moveSet } from "../itemInfo";

describe("attack comparison", () => {
  it("Renders all applicable move data", () => {
    render(<AttackInformation firstSelectedAttack={"Super Chokeslam"} secondSelectedAttack={"Chokeslam"} />);
    const firstSelectedAttackData = moveSet.find((a) => a.name === "Super Chokeslam");
    const secondSelectedAttackData = moveSet.find((a) => a.name === "Chokeslam");
    expect(screen.getByText(`Rarity : ${firstSelectedAttackData.Rarity}`)).toBeInTheDocument();
    expect(screen.getByTestId("attackInfoImg1")).toHaveAttribute("src", firstSelectedAttackData.image);
    expect(screen.getByText(`Damage : ${firstSelectedAttackData.dmg}`)).toBeInTheDocument();
    expect(screen.getByAltText(secondSelectedAttackData.name)).toHaveAttribute("src", secondSelectedAttackData.image);
    expect(screen.getByText(`Damage : ${secondSelectedAttackData.dmg}`)).toBeInTheDocument();
    expect(screen.getByText(`Rarity : ${secondSelectedAttackData.Rarity}`)).toBeInTheDocument();
  });
});
