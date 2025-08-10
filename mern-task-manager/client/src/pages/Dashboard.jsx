//dashboard
import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";


function Dashboard() {
  //usestates
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  //take token from locla storage
  const token = localStorage.getItem("token");

  //fetching tasks with axios
  const fetchTasks = () => {
    axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
  };

//useeffect
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
        {/* //task form component and passing */}
        <TaskForm fetchTasks={fetchTasks} editTask={editTask} setEditTask={setEditTask} />
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} setEditTask={setEditTask} />
        ))}
      </div>
    </div>
  );
}
//exporting
export default Dashboard;
