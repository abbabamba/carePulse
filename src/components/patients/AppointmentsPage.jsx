import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  FileTextIcon,
  PlusIcon
} from 'lucide-react';
import RequestAppointmentForm from './RequestAppointmentForm'; // Importez le composant

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/users/rendezvous",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des rendez-vous :", err);
        setError("Impossible de charger les rendez-vous");
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Fonction pour choisir une couleur selon le statut
  const getStatusColor = (statut) => {
    switch (statut?.toLowerCase()) {
      case "confirmé":
        return { bg: "bg-green-900/20", text: "text-green-400", dot: "bg-green-400" };
      case "annulé":
        return { bg: "bg-red-900/20", text: "text-red-400", dot: "bg-red-400" };
      case "en attente":
        return { bg: "bg-yellow-900/20", text: "text-yellow-400", dot: "bg-yellow-400" };
      default:
        return { bg: "bg-gray-900/20", text: "text-gray-400", dot: "bg-gray-400" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A2725] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A2725] flex justify-center items-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2725] p-6">
      <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl shadow-2xl p-8 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Mes Rendez-vous</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nouveau Rendez-vous</span>
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center bg-white/5 p-8 rounded-xl">
            <p className="text-xl text-gray-300">Aucun rendez-vous trouvé</p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => {
              const statusColors = getStatusColor(appointment.statut);
              return (
                <div
                  key={appointment.id}
                  className={`p-6 rounded-2xl ${statusColors.bg} border border-white/10 hover:border-white/20 transition-all duration-300`}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusColors.bg}`}>
                        <CalendarIcon className={`w-6 h-6 ${statusColors.text}`} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-semibold">
                          {new Date(appointment.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${statusColors.text}`}>
                          <span className={`w-2 h-2 rounded-full ${statusColors.dot}`}></span>
                          <span>{appointment.statut || "Non spécifié"}</span>
                        </span>
                      </div>

                      <div className="space-y-2 text-gray-300">
                        <p className="flex items-center">
                          <ClockIcon className="w-5 h-5 mr-2 text-teal-400" />
                          {appointment.time}
                        </p>
                        <p className="flex items-center">
                          <UserIcon className="w-5 h-5 mr-2 text-teal-400" />
                          {appointment.medecin?.user?.prenom} {appointment.medecin?.user?.nom || "Inconnu"}
                          <span className="ml-2 text-gray-500">
                            - {appointment.medecin?.specialite || "Spécialité non précisée"}
                          </span>
                        </p>
                        <p className="flex items-center">
                          <FileTextIcon className="w-5 h-5 mr-2 text-teal-400" />
                          {appointment.reason || "Aucun motif spécifié"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal pour le formulaire de rendez-vous */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-lg">
            <RequestAppointmentForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
