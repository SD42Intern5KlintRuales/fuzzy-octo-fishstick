import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Eisenhower from "./pages/Eisenhower";
import MainLayout from "./components/layout/MainLayout";
import TaskLogs from "./pages/TaskLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/mytasks" element={<MyTasks/>}/>
        <Route path="/eisenhower" element={<MainLayout><Eisenhower /></MainLayout>}/>
        <Route path="/tasklogs" element={<MainLayout><TaskLogs /></MainLayout>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;