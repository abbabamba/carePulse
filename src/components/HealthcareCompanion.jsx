import React, { useState } from 'react';
import { MapPin, Clock, Phone, Calendar, Bell, UserPlus, Search, CheckCircle, XCircle } from 'lucide-react';

const HealthcareCompanion = () => {
  const [activeTab, setActiveTab] = useState('patient');

  const features = {
    patient: [
      {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Création de compte",
        description: "Créez votre profil patient pour accéder à tous nos services"
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: "Carte interactive",
        description: "Trouvez les médecins et établissements médicaux à proximité"
      },
      {
        icon: <Search className="w-8 h-8" />,
        title: "Recherche avancée",
        description: "Filtrez par spécialité, horaires d'ouverture et disponibilité"
      },
      {
        icon: <Phone className="w-8 h-8" />,
        title: "Contact direct",
        description: "Appelez ou obtenez un itinéraire en un clic"
      },
      {
        icon: <Bell className="w-8 h-8" />,
        title: "Notifications",
        description: "Suivez l'état de vos rendez-vous en temps réel"
      },
      {
        icon: <Calendar className="w-8 h-8" />,
        title: "Gestion des rendez-vous",
        description: "Planifiez et gérez vos consultations facilement"
      }
    ],
    professional: [
      {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Espace professionnel",
        description: "Accédez à votre interface sécurisée"
      },
      {
        icon: <Calendar className="w-8 h-8" />,
        title: "Gestion des patients",
        description: "Visualisez et gérez votre planning de consultations"
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: "Planning interactif",
        description: "Suivez vos rendez-vous et disponibilités"
      },
      {
        icon: <CheckCircle className="w-8 h-8" />,
        title: "Validation des RDV",
        description: "Gérez les demandes de rendez-vous simplement"
      },
      {
        icon: <XCircle className="w-8 h-8" />,
        title: "Gestion des absences",
        description: "Gérez les annulations et reports facilement"
      },
      {
        icon: <Bell className="w-8 h-8" />,
        title: "Notifications",
        description: "Restez informé des modifications de planning"
      }
    ]
  };

  return (
    <section className="py-8 md:py-16 mx-4 bg-white sm:mx-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          Votre compagnon de santé au quotidien
        </h2>

        <div className="flex justify-center mb-8">
        <div className="inline-flex space-x-2">
  <button
    className={`px-6 py-2 rounded-full ${
      activeTab === 'patient'
        ? 'bg-green-800 text-white'
        : 'bg-gray-200 text-gray-700'
    } text-sm md:text-base font-medium`}
    onClick={() => setActiveTab('patient')}
  >
    Patient
  </button>
  <button
    className={`px-6 py-2 rounded-full ${
      activeTab === 'professional'
        ? 'bg-green-800 text-white'
        : 'bg-gray-200 text-gray-700'
    } text-sm md:text-base font-medium`}
    onClick={() => setActiveTab('professional')}
  >
    Professionnel
  </button>
</div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {features[activeTab].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-[#24AE7C] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthcareCompanion;