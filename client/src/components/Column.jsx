import React, { useContext } from 'react';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import { TaskContext } from '../contexts/TaskContext/TaskContext';
import TaskLoader from './TaskLoader';


const Column = ({ title, tasks }) => {
  const {taskLoading} = useContext(TaskContext);
  if (taskLoading) {
    return <TaskLoader />;
  }
  return (
    <div className="bg-base-200 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
