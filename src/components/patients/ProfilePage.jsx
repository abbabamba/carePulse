import React, { useState } from "react";
import axios from "axios";

const ProfilePage = ({ profile, setUserProfile }) => {
  // Initialisation avec les données reçues
  const [formData, setFormData] = useState({
    ...profile,
    ...profile.user, // Champs spécifiques à la relation user
  });

  const [error, setError] = useState(null);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Soumission des modifications
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de l'email
    if (!formData.email.includes("@")) {
      setError("L'email doit être valide.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/patient/me",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Mise à jour réussie !");
      setUserProfile(response.data); // Mettre à jour le profil dans le composant parent
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
        {/* Champs Textuels */}
        {[
          { label: "Prénom", name: "prenom" },
          { label: "Nom", name: "nom" },
          { label: "Email", name: "email", type: "email" },
          { label: "Téléphone", name: "numeroTelephone" },
          { label: "Date de naissance", name: "dateNaissance", type: "date" },
          { label: "Lieu de naissance", name: "lieuNaissance" },
          { label: "Pays de naissance", name: "paysNaissance" },
          { label: "Adresse", name: "adresse" },
          { label: "Code postal", name: "codePostal" },
          { label: "Ville", name: "ville" },
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

        {/* Champ Radio pour le Sexe */}
        <div className="block">
          Sexe à l'état civil :
          {["Masculin", "Féminin"].map((sexe) => (
            <label key={sexe} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="sexe"
                value={sexe}
                checked={formData.sexe === sexe}
                onChange={handleChange}
                className="form-radio text-[#24AE7C]"
              />
              <span className="ml-2">{sexe}</span>
            </label>
          ))}
        </div>

        {/* Bouton de Soumission */}
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
