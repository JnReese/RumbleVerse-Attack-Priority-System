import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AttackComparison, { fightOutcome } from "./attackComparison";

describe("Attack Comparison", () => {
  it("Selecting a player attack renders the correct Fight Outcome info", async () => {
    render(<AttackComparison />);
    fireEvent.mouseDown(screen.getByLabelText("Player Attack"));
    fireEvent.click(screen.getByText("Chokeslam"));
    await waitFor(() => expect(screen.getByText("Chokeslam")).toBeInTheDocument());
    const outcomeInfo = fightOutcome("Chokeslam").outcomeInfo;
    expect(screen.getByText(outcomeInfo)).toBeInTheDocument();
  });
  it("Selecting only an opponent attack renders the please enter attack helper text", () => {});
  it("Selecting an opponent and player attack renders the correct fight outcome", () => {});
  it("Selecting an attack from any dropdown renders the attack info panel", () => {});
});
