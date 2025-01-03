import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCircle2, Calendar } from 'lucide-react';
import { FaUserMd, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import DoctorsImage from '../assets/images/Doctors.png';
import PatientImage from '../assets/images/Hospital.png'; 
import ProfessionalImage1 from '../assets/images/Professional1.png'; 
import ProfessionalImage2 from '../assets/images/Professional2.png'; 
import Compagnon from "../components/HealthcareCompanion";
import Header from '../components/Header';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <Header />
      
      <section className="bg-[#0A2725] w-full relative overflow-hidden min-h-[600px]">

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
      <div className="max-w-4xl">
        {/* Titre principal */}
        <h1 className="text-white text-4xl font-medium mb-3">
          La Santé de Demain
        </h1>
        <p className="text-white/70 text-base mb-10">
          Une plateforme innovante qui connecte patients et professionnels de santé
        </p>
        
<div className="sm:hidden">
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-[850px]">
    <div className="flex flex-col">
      {/* Champ de recherche */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <FaSearch className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Nom, spécialités, établissement..."
          className="w-full ml-4 text-base outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
      
      {/* Champ de localisation */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <FaMapMarkerAlt className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Où ?"
          className="w-full ml-4 text-base outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
    {/* Bouton de recherche */}
    <div className="p-4">
      <button className="w-full py-4 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-medium transition-colors duration-200 rounded-2xl">
        Rechercher
      </button>
    </div>
  </div>
</div>

{/* Version desktop (masquée sur mobile, affichée par défaut sur sm et plus) */}
<div className="hidden sm:block">
  <div className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-lg w-[100%] max-w-[850px]">
    {/* Champ de recherche */}
    <div className="w-full sm:w-[35%] flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
      <div className="flex items-center w-full px-2 py-2">
        <FaSearch className="text-gray-400 w-10 h-5 flex-shrink-8" />
        <input
          type="text"
          placeholder="Nom, spécialités, établissement..."
          className="w-full ml-3 text-base outline-none text-gray-700 placeholder-gray-400 p-4"
        />
      </div>
    </div>
    {/* Champ de localisation */}
    <div className="w-full sm:w-[30%] flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
      <div className="flex items-center w-full px-2 py-2">
        <FaMapMarkerAlt className="text-gray-400 w-5 h-5 flex-shrink-0" />
        <input
          type="text"
          placeholder="Où ?"
          className="w-full ml-3 text-base outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
    {/* Bouton de recherche */}
    <div className="w-full sm:w-1/3 flex justify-end items-center px-2">
      <button className="w-full sm:w-48 py-4 bg-emerald-400 text-emerald-950 font-medium hover:bg-opacity-90 transition-colors duration-200 rounded-full">
        Rechercher
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
    {/* Illustration desktop uniquement */}
    <div className="absolute right-0 bottom-0 hidden lg:block">
      <img
        src={DoctorsImage}
        alt="Professionnels de santé"
        className="h-[550px] w-auto object-contain"
      />
    </div>
</section>



      {/* Patient & Professional Sections */}
      <section className="mx-4 sm:mx-[5%]">
        {/* Patient Section */}
        <div className="flex flex-col md:flex-row items-center bg-[#FFFFFF] p-4 md:p-8">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={PatientImage}
              alt="Patient avec professionnel de santé"
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              Vous êtes patient
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Découvrez Besbicare pour vos rdv et améliorez votre quotidien
            </p>
            <button className="bg-[#0A2725] text-white px-8 py-4 rounded-full hover:bg-[#0d3330] w-full sm:w-auto transition-colors">
              Espace patient
            </button>
          </div>
        </div>

        {/* Professional Section */}
        <div className="bg-[#24AE7C] text-white p-6 md:p-8 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-3/5">
              <h2 className="text-2xl font-bold mb-2">
                Vous êtes professionelle
              </h2>
              <p className="text-white/90 mb-4">
                Une nouvelle manière d'exercer
              </p>
              <ul className="space-y-3 mb-6 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-sm mt-1.5">•</span>
                  <span>Dispensez les meilleurs soins possibles à vos patients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sm mt-1.5">•</span>
                  <span>Profitez d'une meilleure qualité de vie au travail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sm mt-1.5">•</span>
                  <span>Adoptez les solutions utilisées par 1 million de patients au sénégal</span>
                </li>
              </ul>
              <button className="bg-[#0A2725] text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-colors">
                Espace professionelle
              </button>
            </div>

            <div className="w-full md:w-2/5 relative h-[300px]">
              <div className="absolute right-0 top-0 w-[200px] h-[200px]">
                <div className="w-full h-full bg-white rounded-full overflow-hidden">
                  <img
                    src={ProfessionalImage1}
                    alt="Professionnel de santé 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute right-[80px] top-[100px] w-[200px] h-[200px]">
                <div className="w-full h-full bg-white rounded-full overflow-hidden">
                  <img
                    src={ProfessionalImage2}
                    alt="Professionnel de santé 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Compagnon/>

      {/* Statistics Section */}
      <section className="py-8 md:py-16 w-full mx-4 sm:mx-[5%]">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Besbicare en chiffres
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-4">
            {[
              { number: '10k+', label: 'Patients mieux soignées' },
              { number: '1000+', label: 'Médecins utilisant Besbicare' },
              { number: '50k+', label: 'Prise de rendez-vous' },
              { number: '4.9/5', label: 'Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#24AE7C] mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Help Section */}
        <section className="py-8 md:py-12 bg-[#FFFFFF] mx-4 sm:mx-[5%]">
  <div className="flex flex-col md:flex-row items-center justify-between text-center gap-4 md:gap-8">
    <p className="text-sm md:text-base text-gray-600">
      <strong>Des questions ?</strong> Consultez notre Centre d'aide ou contactez-nous
    </p>
    <button className="bg-[#0A2725] text-white px-8 py-4 rounded-full hover:bg-[#0d3330] transition-colors duration-300 text-sm md:text-base w-full sm:w-auto min-w-[200px]">
      Centre d'aide
    </button>
  </div>
</section>



      {/* Footer */}
      <footer className="bg-[#CFEAD6] py-6 md:py-8 mx-4 sm:mx-[5%]">
        <div>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-3 md:gap-8">
            {[
              { to: '/patients', label: 'Patients' },
              { to: '/professionals', label: 'Professionnels' },
              { to: '/specialists', label: 'Specialistes' },
              { to: '/enterprise', label: 'Entreprise' },
              { to: '/legal', label: 'Legal' },
              { to: '/contact', label: 'Contact' }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[#000000] hover:text-[#24AE7C] transition-colors duration-200 text-sm md:text-base py-1 px-2"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="text-center text-gray-500 text-xs md:text-sm mt-6 md:mt-8">
            © {new Date().getFullYear()} Besbicare. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;