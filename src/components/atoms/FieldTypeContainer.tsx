"use client"

import { ItemTypes } from '@/utils/Contants'
import React from 'react'
import { useDrag } from 'react-dnd'

interface CardProps {
  isDragging: boolean
  fieldData?: {
    id: string
    text: string
    fieldTemplate?: any
  }
  children?: React.ReactNode
}

export default function FieldTypeContainer({ isDragging, fieldData, children }: CardProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.FIELD,
      item: fieldData,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    [fieldData]
  )
  return (
    <div
      ref={dragRef as any}
      data-card-draggable="true"
      className={`mb-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      {children}
    </div>
  )
}
