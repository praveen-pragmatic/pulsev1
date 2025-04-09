import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Task = ({ task, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1
  };

  const classes = [
    'bg-white p-3 rounded shadow-sm cursor-move transition-all duration-200',
    isDragging || isSortableDragging ? 'shadow-lg scale-105 z-50' : 'hover:shadow-md'
  ].join(' ');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classes}
    >
      <p className="text-sm text-gray-800">{task.content}</p>
    </div>
  );
};