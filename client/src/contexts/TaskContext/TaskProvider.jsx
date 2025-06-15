import { useEffect, useState } from 'react';
import axios from 'axios';
import { TaskContext } from './TaskContext';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, task);
    setTasks((prev) => [...prev, res.data]);
  };

  const updateTask = async (id, updates) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, updates);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? res.data : t))
    );
  };

  const deleteTask = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
