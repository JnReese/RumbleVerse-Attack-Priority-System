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
  it("Selecting only an opponent attack renders the please enter attack helper text", async () => {
    render(<AttackComparison />);
    fireEvent.mouseDown(screen.getByLabelText("Opponent Attack"));
    fireEvent.click(screen.getByText("Chokeslam"));
    await waitFor(() => expect(screen.getByText("Chokeslam")).toBeInTheDocument());
    expect(screen.getByText("Please enter a player attack to compare")).toBeInTheDocument();
  });
  it.only("Selecting an opponent and player attack renders the correct fight outcome", async () => {
    render(<AttackComparison />);
    fireEvent.mouseDown(screen.getByLabelText("Player Attack"));
    fireEvent.click(screen.getByText("Chokeslam"));
    await waitFor(() => expect(screen.getByText("Chokeslam")).toBeInTheDocument());
    fireEvent.mouseDown(screen.getByLabelText("Opponent Attack"));
    fireEvent.click(screen.getByText("Blue Bat"));
    await waitFor(() => expect(screen.getByText("Blue Bat")).toBeInTheDocument());
    const outcomeInfo = fightOutcome("Chokeslam", "Blue Bat").fightOutcome;
    await waitFor(() => expect(screen.getByText(`Fight Outcome: ${outcomeInfo}`)).toBeInTheDocument());
  });
  it("Selecting an attack from any dropdown renders the attack info panel", () => {});
});
