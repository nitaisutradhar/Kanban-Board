import React, { useState } from "react";
import { TaskProvider } from "../../contexts/TaskContext/TaskProvider";
import KanbanBoard from "../../components/KanbanBoard";
import AddEditTaskModal from "../../components/AddEditTaskModal";

const Home = () => {
    const [selectedTask, setSelectedTask] = useState(null);
  return (
    <TaskProvider>
      <div className="min-h-screen bg-base-100 text-base-content">
        <h1 className="text-3xl font-bold text-center py-6">
          MERN Kanban Board
        </h1>
        <KanbanBoard />
        
        {/* Trigger Modal */}
        <button className="btn btn-success hover:bg-transparent m-6" onClick={() => setSelectedTask({})}>
        + Add Task
        </button>

        {selectedTask && (
        <AddEditTaskModal selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
        )}
      </div>
    </TaskProvider>
  );
};

export default Home;
