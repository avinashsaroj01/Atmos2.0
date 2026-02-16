import "./userlist.scss"
import Navbar from "../Components/Navbar/Navbar"
import Datatable from "../Components/Datatable/Datatable"
import { useEffect, useState } from "react";


const UserList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [user, setUser] = useState();
  const [users, setUsers] = useState();

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

     const pres = await fetch(`${backendUrl}/admin/users`, {
       method: "GET",
       headers,
     });

     const pdata = await pres.json();
     setUsers(pdata.users);
   }

   getUser();
 }, []);


  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {user && <Navbar activeLink={"/admin-portal/users"} user={user} />}
        {users && <Datatable alldata={users} type="users" />}
      </div>
    </div>
  );
}

export default UserList