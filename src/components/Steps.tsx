import React, { FC, useContext } from "react";
import { StepRow } from "./Step/StepRow";
import worktopList from "../fixtures/worktops.json";
import whitegoodsList from "../fixtures/whitegoods.json";
import { CardList } from "./Card/CardList";
import { ICard } from "../interfaces";
import { MainContext } from "../context/MainContext";
import steps from "../fixtures/steps.json";

const StepContent: FC<{ activeStep: number }> = ({ activeStep }) =>
  [
    <div></div>,
    <CardList cards={worktopList as ICard[]} />,
    <CardList cards={whitegoodsList as ICard[]} />,
  ][activeStep];

export const Steps = () => {
  const { activeStep, setActiveStep } = useContext(MainContext);

  return (
    <div>
      {steps.map((step, index) => (
        <StepRow
          key={`step_${index}`}
          text={step.text}
          stepNumber={`${index + 1}`}
          open={activeStep === index}
          done={index < 1}
          onSelect={() => setActiveStep(index)}
        >
          <StepContent activeStep={activeStep} />
        </StepRow>
      ))}
    </div>
  );
};
