import { FC } from "react";

export const StepLabel: FC<{ text: string }> = ({ text }) => (
  <div className="rounded-full h-7 w-7 border-forrestgreen border-2 flex items-center justify-center">
    {text}
  </div>
);
