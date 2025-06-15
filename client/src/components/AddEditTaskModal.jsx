import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext/TaskContext';

const AddEditTaskModal = ({ selectedTask, setSelectedTask }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const hasValues = Object.keys(selectedTask).length;


  useEffect(() => {
    if (hasValues) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        dueDate: selectedTask.dueDate?.split('T')[0] || '',
      });
    }
  }, [hasValues, selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasValues) {
      updateTask(selectedTask._id, { ...formData, status: selectedTask.status });
    } else {
      addTask({ ...formData, status: 'To Do' });
    }
    setSelectedTask(null);
  };

  return (
    <>
      <dialog id="task_modal" className="modal modal-open">
  <div className="modal-box w-full max-w-lg p-8">
    <h3 className="text-2xl font-semibold text-center mb-6">
      {hasValues ? 'Edit Task' : 'Add Task'}
    </h3>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="label font-medium text-sm">Title</label>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Enter task title"
          value={formData?.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="label font-medium text-sm">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Optional task description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="label font-medium text-sm">Due Date</label>
        <input
          className="input input-bordered w-full"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      {/* Action Buttons */}
      <div className="modal-action justify-between pt-6">
        <button type="button" onClick={() => setSelectedTask(null)} className="btn btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {hasValues ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  </div>
</dialog>

    </>
  );
};

export default AddEditTaskModal;
