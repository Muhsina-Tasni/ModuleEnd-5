//navbar component
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  //for use of navigation 
  const navigate = useNavigate();
  //take from local storage
  const token = localStorage.getItem("token");

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-1 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">Task Manager</h1>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
