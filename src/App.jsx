import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Component, useState } from "react";
import TutorDashboard from "./components/TutorDashboard";
import ParentDashboard from "./components/ParentDashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RequestRide from "./components/RequestRide";
import AddBatch from "./components/AddBatch";
import MyBatches from "./components/MyBatches";
import ManageStudents from "./components/ManageStudents";
import Login from "./components/Login";
import MyRides from "./components/MyRides";
import Register from "./components/Register";
import ParentBatches from "./components/ParentBatches";
import AvailableBatches from "./components/AvailableBatches";
import RideRequestsPanel from "./components/RideRequestsPanel";
function App() {
  const [userRole,setUserRole] = useState(null);
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-blue-600">🚗 Tuition Carpool Platform</h1>
      <p className="mt-4 text-gray-700">Tailwind + Vite is working perfectly 🔥</p>
     
    <Navbar  />

    <Routes>
      
    <Route path="/" element = {<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element = {<Login setUserRole={setUserRole}/>} />
    <Route path="/parent" element = {<ParentDashboard />} />
    <Route path="/parent/batches" element = {<ParentBatches />} />
    <Route path="/parent/my-rides" element = {<MyRides />} />
    <Route path="/tutor/ride-requests" element={<RideRequestsPanel />} />

    <Route path="/parent/available-batches" element={<AvailableBatches />} />
     <Route path="/tutor" element={<TutorDashboard />} />
     <Route path="/tutor/my-batches" element={<MyBatches />} />
     <Route path="/tutor/add-batch" element={<AddBatch />} />
     <Route path="/tutor/students" element={<ManageStudents />} />
     <Route path="/parent/request-ride" element={<RequestRide />} />
    </Routes>

     
    </div>
  );
}

export default App;
