//taskitem component
import axios from "axios";

//passing props
function TaskItem({ task, fetchTasks, setEditTask }) {
  const token = localStorage.getItem("token");

  //functiomn when click the button
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return (
    <div className="flex justify-between items-center bg-white border p-3 rounded shadow mb-2">
      <span>{task.title}</span>
      <div className="space-x-2">
        {/* button for edit */}
        <button
          onClick={() => setEditTask(task)}
          className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
        >
          Edit
        </button>
{/* //buttton for delete */}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
//exporting
export default TaskItem;
