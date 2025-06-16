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
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 my-3 space-y-3 border border-base-200"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>

          <span className={`text-xs font-semibold rounded px-2 py-1 ${
            task.priority === 'High' ? 'bg-red-500 text-white' :
            task.priority === 'Medium' ? 'bg-yellow-400 text-black' :
            'bg-green-500 text-white'
          }`}>
            {task.priority}
          </span>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span className='text-xs font-semibold text-gray-600 py-1'>Tags : </span>
            {task.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
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
