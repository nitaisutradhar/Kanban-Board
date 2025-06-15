import React, { useContext, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { TaskContext } from '../contexts/TaskContext/TaskContext';
import AddEditTaskModal from './AddEditTaskModal';

const TaskCard = ({ task, index }) => {
  const { deleteTask } = useContext(TaskContext);
      const [selectedTask, setSelectedTask] = useState(null);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="bg-white shadow p-4 rounded mb-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}</p>
          <div className="mt-2 flex justify-between">
            <button className="btn btn-sm btn-outline btn-info" onClick={() => setSelectedTask(task)}>Edit</button>
            {selectedTask && (
        <AddEditTaskModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
        )}
            <button className="btn btn-sm btn-outline btn-error" onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
