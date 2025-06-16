import { useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const axiosSecure = useAxiosSecure();
const {user} = useAuth()
  const [taskLoading, setTaskLoading] = useState(true);




  useEffect(() => {
  const fetchTasks = async () => {
    const res = await axiosSecure.get('/api/tasks');
    setTasks(res.data);
    setTaskLoading(false);
  };
    fetchTasks();
  }, [axiosSecure, user.email]);

  const addTask = async (task) => {
    const res = await axiosSecure.post('/api/tasks', task);
    setTasks((prev) => [...prev, res.data]);
    setTaskLoading(false);
  };

  const updateTask = async (id, updates) => {
    const res = await axiosSecure.put(`/api/tasks/${id}`, updates);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? res.data : t))
    );
    setTaskLoading(false);
  };

  const deleteTask = async (id) => {
    await axiosSecure.delete(`/api/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setTaskLoading(false);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, taskLoading }}>
      {children}
    </TaskContext.Provider>
  );
};
