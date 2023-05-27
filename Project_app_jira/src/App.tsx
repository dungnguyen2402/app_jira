import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AddProject from "./pages/project/AddProject";
import AddTask from "./pages/task/AddTask";
import LayoutProject from "./layout/LayoutProject";
import ListProject from "./pages/project/ListProject";
import UpdateProject from "./pages/project/UpdateProject";
import { useEffect } from "react";
import axios from "axios";
import Admin from "./pages/admin/Admin";
import NavAdmin from "./pages/admin/NavAdmin";

function App() {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("token"));

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [searchParams.get("token")]);

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
      .catch(() => {
        console.log("Error");
      });
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
          <Route index path="/signup" element={<Signup />} />
          <Route index path="/signin" element={<Signin />} />
          <Route index path="/admin" element={<Admin />}></Route>
          <Route index path="/navadmin" element={<NavAdmin />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
