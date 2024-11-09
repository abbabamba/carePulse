import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-primary">
            Nos Médecins Recommandés
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Découvrez nos praticiens les mieux notés et prenez rendez-vous en quelques clics
          </p>
        </div>

        {/* Grille des médecins */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.slice(0, 9).map((doctor, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointments/${doctor._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-700">Disponible</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {doctor.speciality}
                </p>
                
                {/* Informations supplémentaires */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>4.8/5</span>
                  </div>
                  <span>+100 consultations</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir plus */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              navigate('/doctors');
              scrollTo(0, 0);
            }}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Voir tous nos médecins
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDoctors;