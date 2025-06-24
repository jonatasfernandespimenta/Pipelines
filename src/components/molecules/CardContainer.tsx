"use client"

import Card from "../atoms/Card";
import Button from "../atoms/Button";

interface CardItem {
  id: string;
  text: string;
}

interface CardContainerProps {
  card: CardItem;
  onRemove: (card: CardItem) => void;
  showRemoveButton?: boolean;
}

export default function CardContainer({
  card,
  onRemove,
  showRemoveButton = true
}: CardContainerProps) {
  return (
    <div className="relative">
      <Card
        isDragging={false}
        text={card.text}
        cardData={card}
      />
      {showRemoveButton && (
        <div className="absolute top-2 right-2">
          <Button
            variant="icon"
            size="small"
            onClick={() => onRemove(card)}
            className="w-6 h-6"
          >
            ×
          </Button>
        </div>
      )}
    </div>
  );
}
