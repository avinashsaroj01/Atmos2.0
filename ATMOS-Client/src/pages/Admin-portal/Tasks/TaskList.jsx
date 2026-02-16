import Navbar from "../Components/Navbar/Navbar"
import Datatable from "../Components/Datatable/Datatable"
import { useEffect, useState } from "react";


const TaskList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [user, setUser] = useState();
  const [tasks, setTasks] = useState();

useEffect(() => {
  async function getUser() {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");

    if (!token || !adminId) return;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(`${backendUrl}/admin/users/${adminId}`, {
      method: "GET",
      headers,
    });

    const data = await res.json();
    setUser(data.user);

    const pres = await fetch(`${backendUrl}/admin/tasks`, {
      method: "GET",
      headers,
    });

    const pdata = await pres.json();
    setTasks(pdata.tasks);
  }

  getUser();
}, []);


  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {user && <Navbar activeLink={"/admin-portal/tasks"} user={user} />}
        {tasks && <Datatable alldata={tasks} type="tasks" />}
      </div>
    </div>
  );
}

export default TaskList