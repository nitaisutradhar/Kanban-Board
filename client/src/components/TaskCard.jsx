import React, { useContext, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { TaskContext } from '../contexts/TaskContext/TaskContext';
import AddEditTaskModal from './AddEditTaskModal';

import { Pencil, Trash2 } from 'lucide-react';

const TaskCard = ({ task, index }) => {
  const { deleteTask } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 space-y-3 border border-base-200"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>

          <p className="text-xs text-gray-500">
            📅 Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}
          </p>

          <div className="flex justify-end gap-3">
            <button
              className="btn btn-sm btn-outline btn-info flex items-center gap-1"
              onClick={() => setSelectedTask(task)}
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              className="btn btn-sm btn-outline btn-error flex items-center gap-1"
              onClick={() => deleteTask(task._id)}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          {selectedTask && (
            <AddEditTaskModal
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
