import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const RequestAppointmentForm = ({ onClose }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationReason, setConsultationReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/users/medecins",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctors(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Une erreur est survenue.");
      }
    };

    fetchDoctors();
  }, []);


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const payload = {
    doctorId: selectedDoctor,
    date: selectedDate,
    time: selectedTime,
    reason: consultationReason,
  };

  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/users/rendezvous", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Utilisation de SweetAlert pour afficher une alerte de succès
    Swal.fire({
      icon: "success",
      title: "Rendez-vous demandé avec succès !",
      text: "Votre demande a été envoyée au médecin.",
      confirmButtonText: "OK",
    });

    onClose();
  } catch (err) {
    // Utilisation de SweetAlert pour afficher une alerte d'erreur
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: err.response?.data?.message || "Une erreur est survenue.",
      confirmButtonText: "Réessayer",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-100 fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Demander un Rendez-vous
        </h2>
        {error && (
          <div className="text-red-600 bg-red-100 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Médecin
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Sélectionner un médecin</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.nom} {doctor.prenom} - {doctor.specialite}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Heure
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Raison
            </label>
            <textarea
              value={consultationReason}
              onChange={(e) => setConsultationReason(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="3"
              placeholder="Décrivez brièvement la raison de la consultation"
            />
          </div>
          <div className="flex justify-between items-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-400 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestAppointmentForm;
