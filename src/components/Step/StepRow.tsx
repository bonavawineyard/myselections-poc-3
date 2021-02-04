import { FC, ReactNode } from "react";
import Icon from "../Misc/Icon";
import { StepDone } from "./StepDone";
import { StepLabel } from "./StepLabel";

export const StepRow: FC<{
  text: string;
  done: boolean;
  stepNumber: string;
  price?: string;
  open?: boolean;
  children?: ReactNode;
  onSelect: () => void;
}> = ({ text, done, stepNumber, price, open, children, onSelect }) => {
  const collapsedIcon = open ? "chevronUp" : "chevronDown";
  const icon = done ? "chevronRight" : collapsedIcon;

  return (
    <div className="border-b border-forrestgreen py-3 px-1">
      <div className="flex items-center ">
        {done ? <StepDone /> : <StepLabel text={stepNumber} />}
        <button className="mx-2 flex items-center" onClick={onSelect}>
          {text}
          <div className="h-5 w-5 ml-3">
            <Icon type={icon} />
          </div>
        </button>
        <div className="ml-auto text-sm">{price}</div>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
};
