import React, { useState } from "react";
import axios from "axios";

const ProfilePage = ({ profile, setUserProfile }) => {
  const [formData, setFormData] = useState(profile || {}); 
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { prenom, nom, email, numeroTelephone, ...otherFields } = formData;
  
      // Préparer les données pour l'API
      const updateData = {
        user: { prenom, nom, email, numeroTelephone }, // Champs de `user`
        ...otherFields, // Champs comme `specialite` et `numeroLicence`
      };
  
      const response = await axios.put(
        "http://localhost:3000/api/users/medecin/me",
        updateData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
  
      alert("Mise à jour réussie !");
      setUserProfile(response.data); // Mettre à jour le profil avec les nouvelles données
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour.");
    }
  };
  
  
  

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#f4fcf9] rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-[#24AE7C]">
        Information personnelle
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
  {[
    { label: "Prénom", name: "prenom" },
    { label: "Nom", name: "nom" },
    { label: "Email", name: "email", type: "email" },
    { label: "Téléphone", name: "numeroTelephone" },
    { label: "Spécialité", name: "specialite" }, // Nouveau champ
    { label: "Numéro de Licence", name: "numeroLicence" }, // Nouveau champ
  ].map((field) => (
    <label key={field.name} className="block">
      {field.label} :
      <input
        type={field.type || "text"}
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleChange}
        className="border border-[#24AE7C] rounded-md p-2 w-full bg-[#eaf7f0] focus:outline-none focus:ring-2 focus:ring-[#24AE7C]"
      />
    </label>
  ))}

  <button
    type="submit"
    className="bg-[#24AE7C] text-white py-3 px-6 rounded-full w-full font-medium hover:bg-[#1b8c63] transition-colors"
  >
    Enregistrer
  </button>
</form>

    </div>
  );
};

export default ProfilePage; 