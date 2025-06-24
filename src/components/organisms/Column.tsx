"use client"

import { ItemTypes } from "@/utils/Contants";
import { useDrop } from "react-dnd";
import { tv } from "tailwind-variants";
import ColumnHeader from "../molecules/ColumnHeader";
import CardContainer from "../molecules/CardContainer";
import EmptyState from "../molecules/EmptyState";

interface CardItem {
  id: string
  text: string
}

interface ColumnProps {
  columnId: string
  cards: CardItem[]
  onCardDrop: (card: CardItem) => void
  onCardRemove: (card: CardItem) => void
  onCreateCard?: (cardData: Record<string, any>) => void
  name: string
  canCreateCard?: boolean
  onMoveLeft: () => void
  onMoveRight: () => void
  canMoveLeft: boolean
  canMoveRight: boolean
}

const columnStyle = tv({
  base: "w-[500px] h-[90vh] bg-gray-04 p-4 rounded-lg border-2 border-solid border-transparent",
  variants: {
    isOver: {
      true: "border-dashed border-gray-500",
      false: "",
    },
    canDrop: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      isOver: true,
      canDrop: true,
      class: "bg-brand-color-green",
    },
  ],
  defaultVariants: {
    isOver: false,
    canDrop: false,
  },
});

export default function Column({
  columnId,
  cards,
  onCardDrop,
  onCardRemove,
  onCreateCard,
  name,
  canCreateCard,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight
}: ColumnProps) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: CardItem, monitor) => {
      onCardDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div>
      <ColumnHeader
        canCreateCard={canCreateCard}
        title={name}
        count={cards.length}
        onCreateCard={onCreateCard}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
        canMoveLeft={canMoveLeft}
        canMoveRight={canMoveRight}
      />
      <div
        ref={dropRef as any}
        className={columnStyle({ isOver, canDrop })}
      >
        {cards.length === 0 ? (
          <EmptyState message="Drop items here" />
        ) : (
          <div className="flex flex-col gap-2">
            {cards.map(card => (
              <CardContainer
                key={card.id}
                card={card}
                onRemove={onCardRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
