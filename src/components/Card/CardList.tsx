import { FC, useContext } from "react";
import { Card } from "./Card";
import { MainContext } from "../../context/MainContext";
import { ICard, ISelectedIndex } from "../../interfaces";

export const CardList: FC<{
  cards: ICard[];
}> = ({ cards }) => {
  const { selectedIndex, setSelectedIndex, setLayerImages } = useContext(
    MainContext
  );

  const handleSelect = (card: ICard, index: number) => {
    setSelectedIndex((oldSelectedIndex: ISelectedIndex) => ({
      ...oldSelectedIndex,
      [card.type]: index,
    }));

    setLayerImages((layerImages) => [
      ...(layerImages?.filter(({ type }) => type !== card.type) || []),
      { src: card.src, type: card.type },
    ]);
  };

  return (
    <div className="w-full grid grid-cols-4 gap-2 py-4">
      {cards.map((card, index) => (
        <Card
          {...card}
          key={`card_${index}`}
          selected={index === selectedIndex[card.type]}
          onSelect={() => handleSelect(card, index)}
        />
      ))}
    </div>
  );
};
