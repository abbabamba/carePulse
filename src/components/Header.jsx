import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-2 pt-4">
        {/* Côté gauche */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vh]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight md:leading-tight lg:leading-tight">
            Votre Santé,<br/>
            Notre Priorité
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            Connectez-vous avec les meilleurs professionnels de santé
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600 text-base">
            <img className="w-32" src={assets.group_profiles} alt="Profils des professionnels"/>
            <div className="flex flex-col gap-2">
              <p className="font-medium">+1000 Professionnels de santé</p>
              <p className="text-sm">Médecins et patients connectés sur notre plateforme</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4">
            <Link 
              to="/register" 
              className="flex items-center justify-center gap-2 bg-primary px-8 py-4 rounded-full text-white text-base font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Créer un compte
              <img className="w-4" src={assets.arrow_icon} alt="flèche"/>
            </Link>
            
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-primary border-2 border-primary text-base font-medium hover:bg-primary/10 transition-all duration-300">
              En savoir plus
            </button>
          </div>

          <div className="flex gap-8 mt-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">98%</span>
              <span className="text-sm text-gray-600">Satisfaction</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">24/7</span>
              <span className="text-sm text-gray-600">Disponibilité</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">+5000</span>
              <span className="text-sm text-gray-600">Consultations</span>
            </div>
          </div>
        </div>

        {/* Côté droit */}
        <div className="md:w-1/2 relative mt-10 md:mt-0">
          <div className="relative">
            <img
              src={assets.header_img}
              className="w-full h-auto rounded-2xl shadow-2xl"
              alt="Professionnels de santé"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg hidden md:flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <img src={assets.doctor_icon} alt="Icône docteur" className="w-6 h-6"/>
              </div>
              <div>
                <p className="font-medium text-sm">Consultation facile</p>
                <p className="text-xs text-gray-500">En présentiel ou en ligne</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;