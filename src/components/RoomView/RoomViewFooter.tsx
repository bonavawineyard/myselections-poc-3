import { FC, useContext } from "react";
import { MainContext } from "../../context/MainContext";

export const RoomViewFooter: FC = () => {
  const { isShrunk } = useContext(MainContext);

  return (
    <div
      className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center items-end py-2 px-2"
      style={{
        opacity: isShrunk ? "0" : "1",
        transition: "opacity 0.2s",
      }}
    >
      <div className="lg:col-start-2 italic text-xs bg-white bg-opacity-50 px-8 py-1">
        Detta är ett exempelkök
      </div>
      <div className="md:ml-auto">
        <button className="border-2 border-forrestgreen rounded bg-white px-4 py-2 mx-1">
          Köksuppställning
        </button>
        <button className="border-2 border-forrestgreen rounded bg-white px-4 py-2 mx-1">
          Planlösning
        </button>
      </div>
    </div>
  );
};
