import React, { useContext } from 'react';
import Column from './Column';
import { DragDropContext } from '@hello-pangea/dnd';
import { TaskContext } from '../contexts/TaskContext/TaskContext';

const KanbanBoard = () => {
  const { tasks, updateTask } = useContext(TaskContext);

  const statuses = ['To Do', 'In Progress', 'Completed'];

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const movedTask = tasks.find((t) => t._id === draggableId);
    if (movedTask) {
      updateTask(draggableId, { ...movedTask, status: destination.droppableId });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-6 p-6">
        {statuses.map((status) => (
          <Column
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
