import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
import Home from "./pages/Home/Home";
import HomePage from "./pages/HomePage/Home";
import Projects from "./pages/Projects/Projects";
import Chat from "./pages/Messages/Chat";
// import Notes from "./pages/Notes/Notes";
import ProjectMainView from "./pages/ProjectDashboard/ProjectMainView";
import CreateProject from "./pages/Projects/CreateProject";
import SignUp from "./pages/Sign-Up/Sign-Up";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import Logout from "./pages/Logout/Logout";
// import Dashboard from "./pages/Admin/Dashboard";
import HomeAdmin from "./pages/Admin-portal/Home/Home-Admin";
import UserList from "./pages/Admin-portal/Users/UserList";
import UserSingle from "./pages/Admin-portal/Users/UserSingle";
import ProjectList from "./pages/Admin-portal/Projects/ProjectList";
import TaskList from "./pages/Admin-portal/Tasks/TaskList";
import SectionList from "./pages/Admin-portal/Sections/SectionList";
import LoginAdmin from "./pages/Admin-portal/Login/LoginAdmin";
import LogoutAdmin from "./pages/Admin-portal/Login/LogoutAdmin";
import AboutUS from "./pages/AboutUs/AboutUs";
import Contact from "./pages/ContactUs/Contact";
import Notes from "./pages/Notes/Notes";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import NoteEditor from "./pages/Notes/NoteEditor";
import Page404 from "./pages/Extra/Page404";
import RequireAuth from "./access-control/RequireAuth";

// 6,50,000 + 2,50,000 + 1,00,000 + 9,10,000 + 1,00,000

// 40,000 + 35,000 +

const App = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${backendUrl}/user/getUserInfo`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      data["token"] = token;
      dispatch(login(data));
    }
    if (token) {
      getUser();
    }
  }, []);
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route
              exact
              path="/"
              element={
                  <HomePage />
              }
            />
            <Route
              exact
              path="/notes"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <Notes />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <SignUp />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/login"
              element={
               
                  <Login />
               
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <UserProfile />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/logout"
              element={
              
                  <Logout />
               
              }
            />
            <Route
              exact
              path="/home"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/projects"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <Projects />
                </RequireAuth>
              }
            />
            <Route
              path="/message"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <Chat />
                </RequireAuth>
              }
            />
            <Route
              path="/createproject"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <CreateProject />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/projects/:id/board"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <ProjectMainView Board />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/noteeditor/:id"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <NoteEditor />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/projects/:id/overview"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <ProjectMainView OverView />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/projects/:id/charts"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <ProjectMainView Charts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/projects/:id/timeline"
              element={
                <RequireAuth allowedRoles={["user"]}>
                  <ProjectMainView Timeline />
                </RequireAuth>
              }
            />
            <Route
              path="/admin-portal"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <HomeAdmin />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/admin-portal/users"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <UserList />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/admin-portal/users/:id"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <UserSingle />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/admin-portal/projects"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <ProjectList />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/admin-portal/tasks"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <TaskList />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/admin-portal/sections"
              element={
                <RequireAuth allowedRoles={["admin"]}>
                  <SectionList />
                </RequireAuth>
              }
            />
           
            <Route exact path="/aboutUs" element={<AboutUS />} />
            <Route exact path="/contactUs" element={<Contact />} />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
