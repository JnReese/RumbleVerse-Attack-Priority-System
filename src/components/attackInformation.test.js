import { render, screen, fireEvent } from "@testing-library/react";
import AttackInformation, { attackMulitplier } from "./attackInformation";
import { moveSet } from "../itemInfo";

describe("attack comparison", () => {
  const firstSelectedAttackData = moveSet.find((a) => a.name === "Super Chokeslam");
  const secondSelectedAttackData = moveSet.find((a) => a.name === "Chokeslam");
  it("Renders all applicable move data", () => {
    render(<AttackInformation playerSelectedAttack={"Super Chokeslam"} opponentSelectedAttack={"Chokeslam"} />);
    expect(screen.getByText(`Rarity : ${firstSelectedAttackData.Rarity}`)).toBeInTheDocument();
    expect(screen.getByTestId(firstSelectedAttackData.name)).toHaveAttribute("src", firstSelectedAttackData.image);
    expect(screen.getByText(`Damage : ${firstSelectedAttackData.dmg}`)).toBeInTheDocument();
    expect(screen.getByTestId(secondSelectedAttackData.name)).toHaveAttribute("src", secondSelectedAttackData.image);
    expect(screen.getByText(`Damage : ${secondSelectedAttackData.dmg}`)).toBeInTheDocument();
    expect(screen.getByText(`Rarity : ${secondSelectedAttackData.Rarity}`)).toBeInTheDocument();
  });
  it("damage output increases when the increase attack multiplier button is clicked.", () => {
    render(<AttackInformation playerSelectedAttack={"Super Chokeslam"} opponentSelectedAttack={"Chokeslam"} />);
    screen.debug();
    const increaseButton = screen.getByLabelText("increase attack multiplier");
    fireEvent.click(increaseButton);
    expect(
      screen.getByText(`Damage : ${firstSelectedAttackData.dmg + firstSelectedAttackData.dmg * attackMulitplier[1]}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Damage : ${secondSelectedAttackData.dmg + secondSelectedAttackData.dmg * attackMulitplier[1]}`)
    ).toBeInTheDocument();
  });
  it("damage output decreases when the decrease attack multiplier button is clicked.", () => {
    render(<AttackInformation playerSelectedAttack={"Super Chokeslam"} opponentSelectedAttack={"Chokeslam"} />);
    screen.debug();
    const increaseButton = screen.getByLabelText("increase attack multiplier");
    const decreaseButton = screen.getByLabelText("reduce attack multiplier");
    fireEvent.click(increaseButton);

    expect(
      screen.getByText(`Damage : ${firstSelectedAttackData.dmg + firstSelectedAttackData.dmg * attackMulitplier[1]}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Damage : ${secondSelectedAttackData.dmg + secondSelectedAttackData.dmg * attackMulitplier[1]}`)
    ).toBeInTheDocument();

    fireEvent.click(decreaseButton);

    expect(screen.getByText(`Damage : ${firstSelectedAttackData.dmg}`)).toBeInTheDocument();
    expect(screen.getByText(`Damage : ${secondSelectedAttackData.dmg}`)).toBeInTheDocument();
  });
});
