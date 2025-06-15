import React from "react";
import { TaskProvider } from "../../contexts/TaskContext/TaskProvider";
import KanbanBoard from "../../components/KanbanBoard";

const Home = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-base-100 text-base-content">
        <h1 className="text-3xl font-bold text-center py-6">
          MERN Kanban Board
        </h1>
        <KanbanBoard />
      </div>
    </TaskProvider>
  );
};

export default Home;
