import { useEffect, useMemo, useState } from "react";
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

interface IFormDataField {
  dataField: any;
  setDataField: (data: any) => void;
}

export default function FormDataField({ dataField, setDataField }: IFormDataField) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddField = () => {
    setDataField((prev: any) => [
      ...prev,
      {
        name: "",
        label: "",
        type: "",
      },
    ]);
  };

  const callbackUpdateDataField = (data: any, index: number) => {
    setDataField((prev: any) => {
      prev[index] = data;
      return [...prev];
    });
  };

  const handleRemoveField = (index: number) => {
    console.log(index)
    setDataField((prev: any) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const renderListFIeld = useMemo(() => {
    return dataField.map((item: any, index: number) => <FieldItem key={index} data={item} callbackUpdate={(data: any) => callbackUpdateDataField(data, index)} callbackRemove={() => handleRemoveField(index)} />);
  }, [dataField]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={dataField}
            strategy={verticalListSortingStrategy}
          >
            {renderListFIeld}
          </SortableContext>
        </DndContext>
      </div>
      <div onClick={handleAddField} className="cursor-pointer w-full h-10 rounded-lg border-dashed border border-emerald-500 bg-emerald-50 text-emerald-500 text-sm font-medium flex justify-center items-center">Tambah Kolom</div>
    </div>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setDataField((prev: any) => {
        const oldIndex = prev.indexOf(active.id);
        const newIndex = prev.indexOf(over.id);
        
        console.log(event, active.id !== over.id, arrayMove(prev, oldIndex, newIndex))
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }
}