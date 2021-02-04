import { IIcon } from "../../interfaces";

const Icon: React.FunctionComponent<IIcon> = ({ type }) => {
  const paths: any = {
    check: "M5 13l4 4L19 7",
    chevronRight: "M9 5l7 7-7 7",
    chevronDown: "M19 9l-7 7-7-7",
    chevronUp: "M5 15l7-7 7 7",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className=" text-forrestgreen"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={paths[type]}
      />
    </svg>
  );
};

export default Icon;
