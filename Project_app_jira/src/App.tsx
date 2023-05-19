import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AddProject from "./pages/project/AddProject";
import AddTask from "./pages/task/AddTask";
import LayoutProject from "./layout/LayoutProject";
import ListProject from "./pages/project/ListProject";
import UpdateProject from "./pages/project/UpdateProject";
// import UpdateTask from './pages/task/UpdateTask'
import UserOtp from "./pages/UserOtp";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get(`http://localhost:1337/current-user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        const { password, ...userData } = data;

        localStorage.setItem("currentUser", JSON.stringify(userData));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route index path="layout" element={<LayoutProject />} />
          <Route index path="/addtask" element={<AddTask />} />
          <Route index path="/addproject" element={<AddProject />} />
          <Route index path="/project" element={<ListProject />} />
          <Route index path="/project/:id" element={<UpdateProject />} />
          {/* <Route index path='/task/:id' element={<UpdateTask />} /> */}
          <Route index path="/signup" element={<Signup />} />
          <Route index path="/signin" element={<Signin />} />
          <Route index path="/user/otp" element={<UserOtp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
