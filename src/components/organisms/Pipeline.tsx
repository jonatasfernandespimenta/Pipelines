"use client"

import { ItemTypes } from "@/utils/Contants"
import { useState, useRef, useEffect } from "react"
import Card from "../atoms/Card"
import Column from "./Column"
import AddColumnButton from "../molecules/AddColumnButton"

interface CardItem {
  id: string
  text: string
  columnId?: string
}

interface ColumnData {
  id: string
  name: string
  canCreateCard?: boolean
}

export function Pipeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const [columns] = useState<ColumnData[]>([
    { id: "backlog", name: "Backlog", canCreateCard: true },
    { id: "in_progress", name: "In Progress" },
    { id: "done", name: "Done" }
  ])

  const [cards, setCards] = useState<CardItem[]>([
    { id: "1", text: "Cartao 1", columnId: "backlog" },
    { id: "2", text: "Cartao 2", columnId: "backlog" },
    { id: "3", text: "Cartao 3", columnId: "backlog" }
  ])

  const moveCardToColumn = (card: CardItem, targetColumnId: string) => {
    setCards(prev =>
      prev.map(c =>
        c.id === card.id
          ? { ...c, columnId: targetColumnId }
          : c
      )
    )
  }

  const getCardsForColumn = (columnId: string) => {
    return cards.filter(card => card.columnId === columnId)
  }

  const moveCardToBacklog = (card: CardItem) => {
    moveCardToColumn(card, "backlog")
  }

  const createCard = (columnId: string, cardData: { text: string }) => {
    const newCard: CardItem = {
      id: Date.now().toString(), // Simple ID generation - in real app use UUID
      text: cardData.text,
      columnId: columnId
    }
    setCards(prev => [...prev, newCard])
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return

    // Check if any modal is open
    if (document.body.hasAttribute("data-modal-open")) return

    const target = e.target as HTMLElement
    const cardElement = target.closest('[data-card-draggable="true"]') || target.closest('.cursor-move')

    if (cardElement) return

    setIsScrolling(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrolling || !scrollContainerRef.current) return
    // Stop scrolling if a modal opens during drag
    if (document.body.hasAttribute("data-modal-open")) {
      setIsScrolling(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
      return
    }
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsScrolling(false)
    document.body.style.cursor = 'default'
    document.body.style.userSelect = 'auto'
  }

  const handleMouseLeave = () => {
    setIsScrolling(false)
    document.body.style.cursor = 'default'
    document.body.style.userSelect = 'auto'
  }

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }
  }, [])

  return (
    <div
      ref={scrollContainerRef}
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#1c1c1c",
        overflowX: "auto",
        overflowY: "hidden",
        cursor: isScrolling ? 'grabbing' : 'grab',
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
        userSelect: isScrolling ? 'none' : 'auto',
        WebkitUserSelect: isScrolling ? 'none' : 'auto', // Safari/Chrome
        MozUserSelect: isScrolling ? 'none' : 'auto', // Firefox
      }}
      className="scrollbar-hide"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {columns.map(column => (
        <Column
          key={column.id}
          cards={getCardsForColumn(column.id)}
          onCardDrop={(card) => moveCardToColumn(card, column.id)}
          onCardRemove={moveCardToBacklog}
          onCreateCard={(cardData) => createCard(column.id, cardData)}
          name={column.name}
          canCreateCard={column.canCreateCard}
        />
      ))}

      <AddColumnButton />
    </div>
  )
}
