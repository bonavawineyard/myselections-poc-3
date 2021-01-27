import { FC, useContext } from "react";
import { Card, ICard } from "./Card";
import { MainContext } from "../context/MainContext";

export const CardList: FC<{
  cards: ICard[];
}> = ({ cards }) => {
  const { selectedIndex, setSelectedIndex } = useContext(MainContext);

  return (
    <div className="w-full grid grid-cols-4 gap-2 py-4">
      {cards.map((cardItem, index) => (
        <Card
          {...cardItem}
          key={`card_${index}`}
          selected={index === selectedIndex}
          onSelect={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
};
