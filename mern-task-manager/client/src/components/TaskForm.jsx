//Takform component 
import { useState, useEffect } from "react";
//axios for fetching
import axios from "axios";

///passing props from dashboard to reload tasks
function TaskForm({ fetchTasks, editTask, setEditTask }) {
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");


  //useeffect 
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    }
  }, [editTask]);
//function when submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, { title }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditTask(null);
      } else {
        await axios.post(`http://localhost:5000/api/tasks`, { title }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    //form
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 flex-1 rounded"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {/* /button */}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {editTask ? "Update" : "Add"}
      </button>
    </form>
  );
}
//exportig
export default TaskForm;
