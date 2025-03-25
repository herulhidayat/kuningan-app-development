import { useState } from "react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import FieldItem from "../atoms/field-item";

export default function FormDataField() {
  const [dataField, setDataField] = useState<any>([
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={dataField}
        strategy={verticalListSortingStrategy}
      >
        {dataField.map((item: any, index: number) => <FieldItem key={index} data={item} />)}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event:any) {
    console.log(event)
    const { active, over } = event;

    if (active.id !== over.id) {
      setDataField((prev: any) => {
        const oldIndex = prev.indexOf(active.id);
        const newIndex = prev.indexOf(over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }
}