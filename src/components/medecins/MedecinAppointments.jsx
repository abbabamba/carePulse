import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircleIcon, XCircleIcon, TrashIcon } from 'lucide-react';
import Swal from "sweetalert2";


const MedecinAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/users/rendezvousmedecin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors du chargement des rendez-vous.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };


  const handleConfirm = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/users/${id}/statut`,
        { statut: "confirme" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, statut: "Confirmé" } : appointment
        )
      );
  
      Swal.fire({
        icon: "success",
        title: "Rendez-vous confirmé",
        text: "Le rendez-vous a été confirmé avec succès.",
        confirmButtonColor: "#4CAF50",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.message || "Erreur lors de la confirmation du rendez-vous.",
      });
    }
  };
  
  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/users/${id}/statut`,
        { statut: "annule" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, statut: "Annulé" } : appointment
        )
      );
  
      Swal.fire({
        icon: "success",
        title: "Rendez-vous annulé",
        text: "Le rendez-vous a été annulé avec succès.",
        confirmButtonColor: "#E53935",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.message || "Erreur lors de l'annulation du rendez-vous.",
      });
    }
  };
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E53935",
      cancelButtonColor: "#757575",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });
  
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
  
        Swal.fire({
          icon: "success",
          title: "Supprimé",
          text: "Le rendez-vous a été supprimé avec succès.",
          confirmButtonColor: "#4CAF50",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: err.response?.data?.message || "Erreur lors de la suppression du rendez-vous.",
        });
      }
    }
  };
  

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirme': return 'bg-green-100 text-green-800';
      case 'annule': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#0A2725]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-300"></div>
      </div>
    );

  if (error) return (
    <div className="text-red-500 bg-[#0A2725] min-h-screen p-8 flex justify-center items-center">
      <div className="bg-white/10 p-6 rounded-xl shadow-xl">
        <p className="text-lg">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A2725] p-8 text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          Mes Rendez-vous
        </h1>
        
        {appointments.length === 0 ? (
          <div className="text-center bg-white/10 p-8 rounded-xl">
            <p className="text-xl text-gray-300">Aucun rendez-vous disponible.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white/10 rounded-xl overflow-hidden shadow-xl">
              <thead className="bg-teal-900/50">
                <tr>
                  {['Date', 'Heure', 'Motif', 'Patient', 'Statut', 'Actions'].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr 
                    key={appointment.id} 
                    className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(appointment.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatTime(appointment.time)}
                    </td>
                    <td className="px-6 py-4">
                      {appointment.reason || "Non spécifié"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.patient?.user?.prenom} {appointment.patient?.user?.nom}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.statut)}`}>
                        {appointment.statut || "En attente"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleConfirm(appointment.id)}
                          className="text-green-500 hover:text-green-700 transition-colors"
                          title="Confirmer"
                        >
                          <CheckCircleIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Annuler"
                        >
                          <XCircleIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          title="Supprimer"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedecinAppointments;