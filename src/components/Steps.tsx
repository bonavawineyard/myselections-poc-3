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
  const { activeStep, setActiveStep, selectedIndex } = useContext(MainContext);

  const isDone = (step: any, index: number) => {
    if (index === 0) {
      return true;
    } else if (index === 1) {
      return selectedIndex.worktop >= 0;
    } else if (index === 2) {
      return (
        selectedIndex.whitegoods_fridge >= 0 ||
        selectedIndex.whitegoods_micro >= 0
      );
    }

    return false;
  };

  return (
    <div>
      {steps.map((step, index) => (
        <StepRow
          key={`step_${index}`}
          text={step.text}
          stepNumber={`${index + 1}`}
          open={activeStep === index}
          done={isDone(step, index)}
          onSelect={() => setActiveStep(activeStep >= 0 ? -1 : index)}
        >
          <StepContent activeStep={activeStep} />
        </StepRow>
      ))}
    </div>
  );
};
