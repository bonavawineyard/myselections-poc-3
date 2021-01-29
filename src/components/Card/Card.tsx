import { FC } from "react";

export interface ICard {
  name: string;
  price: string;
  text: string;
  selected?: boolean;
  onSelect?: () => void;
}

export const Card: FC<ICard> = ({ name, price, text, selected, onSelect }) => {
  return (
    <article className="border flex flex-col">
      <img src={`/card/card_${name.toLowerCase()}.png`} alt="" />
      <header className="text-center border-b p-2">
        <h3>{name}</h3>
        <div>{price}</div>
      </header>
      <section className="py-1 px-3">
        <p>{text}</p>
      </section>
      <footer className="px-3 py-3 mt-auto">
        <button
          className={`w-full bg-mint border font-bold py-2 rounded mt-4 ${
            selected && "bg-opacity-30 "
          }`}
          onClick={onSelect}
        >
          {selected ? "Vald" : "Välj"}
        </button>
      </footer>
    </article>
  );
};
