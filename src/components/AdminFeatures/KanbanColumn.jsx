import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from './Task';

export const KanbanColumn = ({ id, title, tasks, columnType }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const getColumnStyle = (type) => {
    switch (type) {
      case 'insights':
        return 'bg-blue-50 text-blue-800';
      case 'optimize':
        return 'bg-green-50 text-green-800';
      case 'transform':
        return 'bg-primary-50 text-primary-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg min-h-[200px] transition-colors ${getColumnStyle(columnType).split(' ')[0]} ${
        isOver ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
      }`}
    >
      <h3 className={`font-medium mb-4 ${getColumnStyle(columnType).split(' ')[1]}`}>{title}</h3>
      <SortableContext 
        items={tasks.map(t => t.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 min-h-[100px]">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};