import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuBar from "./patients/MenuBar";
import ProfilePage from "./patients/ProfilePage";
import AppointmentsPage from "./patients/AppointmentsPage";
import MedicalFacilityFinder from "./patients/MedicalFacilityFinder";
import { MapPin } from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/users/patient/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Données reçues pour le profil :", response.data);
        setUserProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  const DashboardContent = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-6">
        Bienvenue, {userProfile?.user?.prenom} !
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Carte des établissements médicaux */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-[#0A2725] mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Établissements médicaux
              </h2>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Trouvez les établissements médicaux les plus proches de chez vous : pharmacies, cliniques, hôpitaux et médecins.
          </p>
          <button
            onClick={handleMapToggle}
            className="w-full bg-[#0A2725] text-white px-4 py-2 rounded-md hover:bg-black transition-colors duration-300 flex items-center justify-center"
          >
            <MapPin className="mr-2 h-5 w-5" />
            {showMap ? "Masquer la carte" : "Afficher la carte"}
          </button>
        </div>

        {/* Autres cartes de fonctionnalités peuvent être ajoutées ici */}
      </div>

      {/* Carte interactive */}
      {showMap && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <div className="h-[600px]">
            <MedicalFacilityFinder />
          </div>
        </div>
      )}
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <MenuBar
        userName={userProfile?.user?.prenom}
        onLogout={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        setActivePage={setActivePage}
      />
      
      <main className="py-6">
        {activePage === "dashboard" && <DashboardContent />}
        {activePage === "profile" && (
          <ProfilePage profile={userProfile} setUserProfile={setUserProfile} />
        )}
        {activePage === "appointments" && <AppointmentsPage />}
      </main>
    </div>
  );
};

export default PatientDashboard;