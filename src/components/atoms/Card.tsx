"use client"

import { ItemTypes } from '@/utils/Contants'
import React from 'react'
import { useDrag } from 'react-dnd'

interface CardProps {
  isDragging: boolean
  text: string
  cardData?: {
    id: string
    text: string
  }
}

export default function Card({ isDragging, text, cardData }: CardProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: cardData || { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    [cardData]
  )
  return (
    <div
      ref={dragRef as any}
      data-card-draggable="true"
      className={`bg-gray-03 rounded p-4 mb-2 cursor-move select-none ${isDragging ? 'opacity-50' : ''}`}
    >
      {text}
    </div>
  )
}
