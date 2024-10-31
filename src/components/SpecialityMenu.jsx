import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="bg-gradient-to-b from-secondary to-secondary/90 py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* En-tête de section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            Nos Spécialités Médicales
          </h2>
          <p className="max-w-2xl mx-auto text-gray-200 text-lg">
            Trouvez le spécialiste qui correspond à vos besoins parmi nos experts certifiés
          </p>
        </div>

        {/* Carrousel de spécialités */}
        <div className="w-full max-w-6xl">
          <div className="flex gap-6 pb-4 pt-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {specialityData.map((item, index) => (
              <Link
                key={index}
                to={`/doctors/${item.speciality}`}
                onClick={() => scrollTo(0, 0)}
                className="snap-center flex flex-col items-center min-w-[200px] bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="bg-white rounded-xl p-4 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src={item.image} 
                    alt={item.speciality}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-white font-medium text-lg text-center">
                  {item.speciality}
                </h3>
                <p className="text-gray-300 text-sm text-center mt-2">
                  Consultez nos experts
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;