import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuBar from "./medecins/MenuBar";
import ProfilePage from "./medecins/ProfilePage";
import MedecinAppointments from "./medecins/MedecinAppointments";

const MedecinDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard"); 
  const [userProfile, setUserProfile] = useState(null); // Stocke les données utilisateur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/users/medecin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Données reçues pour le profil médecin :", response.data);
        setUserProfile(response.data); // Inclut tous les champs renvoyés par l'API
      } catch (err) {
        setError(err.response?.data?.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);
  
  

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <MenuBar
        userName={userProfile?.user?.prenom} // Passe le prénom à MenuBar
        onLogout={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        setActivePage={setActivePage} // Passe l'état au MenuBar
      />
      <div className="p-6">
        {activePage === "dashboard" && (
          <div>
          <h1 className="text-2xl font-semibold mb-4">
            Bienvenue, Dr. {userProfile?.user?.prenom} {userProfile?.user?.nom} !
          </h1>
          <p><strong>Spécialité :</strong> {userProfile?.specialite}</p>
          <p><strong>Numéro de Licence :</strong> {userProfile?.numeroLicence}</p>
        </div>
        
            
        
        )}
       {activePage === "profile" && (
  <ProfilePage
    profile={{
      ...userProfile,
      ...userProfile.user, // Fusionne les champs de `user` dans le profil
    }}
    setUserProfile={setUserProfile} 
  />
)}
{activePage === "appointments" && <MedecinAppointments />}

      </div>
    </div>
  );
};

export default MedecinDashboard;
