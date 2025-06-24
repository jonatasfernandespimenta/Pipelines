"use client"

import { useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

interface CreateCardFormProps {
  onSubmit: (cardData: { text: string }) => void;
  onCancel: () => void;
}

export default function CreateCardForm({ onSubmit, onCancel }: CreateCardFormProps) {
  const [cardText, setCardText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardText.trim()) return;

    setIsSubmitting(true);
    try {
      onSubmit({ text: cardText.trim() });
      setCardText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Text variant="label" className="block mb-2">
          Card Title
        </Text>
        <textarea
          value={cardText}
          onChange={(e) => setCardText(e.target.value)}
          placeholder="Enter card description..."
          className="w-full p-3 bg-gray-04 border border-gray-03 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cx-blue focus:border-transparent"
          rows={3}
          autoFocus
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={!cardText.trim() || isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating..." : "Create Card"}
        </Button>
      </div>
    </form>
  );
}
