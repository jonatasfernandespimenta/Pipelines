"use client"

import Card from "@/components/atoms/Card";
import { Pipeline } from "@/components/organisms/Pipeline";
import { ItemTypes } from "@/utils/Contants";
import Image from "next/image";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Pipeline />
    </DndProvider>
  );
}
