import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MonProfile from './components/patients/ProfilePage';

import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import PatientDashboard from './components/PatientDashboard';
import MedecinDashboard from './components/MedecinDashboard';
import PrivateRoute from './ProtectedRoute';
import MedicalFacilityFinder from './components/patients/MedicalFacilityFinder';



const App = () => {
  return (
    <div className="max-w-[1430px] mx-auto ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/monprofile" element={<MonProfile />} />
        <Route path="/etablissement" element={<MedicalFacilityFinder />} />


        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointments/:docId" element={<Appointment />} />
        <Route path="/patient/dashboard" element={<PrivateRoute allowedUserType="patient"><PatientDashboard /></PrivateRoute>} />
        <Route path="/medecin/dashboard" element={<PrivateRoute allowedUserType="medecin"><MedecinDashboard /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default App;
