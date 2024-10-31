import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  const footerLinks = {
    Patients: [
      { name: 'Trouver un médecin', path: '/doctors' },
      { name: 'Prendre rendez-vous', path: '/appointments' },
      { name: 'Urgences', path: '/emergency' },
      { name: 'FAQ Patients', path: '/faq/patient' },
    ],
    Professionnels: [
      { name: 'Rejoindre la plateforme', path: '/register/doctor' },
      { name: 'Avantages', path: '/benefits' },
      { name: 'Tarifs', path: '/pricing' },
      { name: 'FAQ Professionnels', path: '/faq/doctor' },
    ],
    Entreprise: [
      { name: 'À propos', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/blog' },
      { name: 'Carrières', path: '/careers' },
    ],
    Légal: [
      { name: 'Conditions d\'utilisation', path: '/terms' },
      { name: 'Politique de confidentialité', path: '/privacy' },
      { name: 'Mentions légales', path: '/legal' },
      { name: 'Cookies', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Section principale */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">
                Restez informé
              </h3>
              <p className="text-gray-400">
                Inscrivez-vous à notre newsletter pour recevoir nos actualités
              </p>
            </div>
            <div className="md:w-1/2 flex max-w-md">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-r-full hover:bg-primary/90 transition-colors duration-200">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Section finale */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-sm text-gray-400">
              © 2024 MediConnect. Tous droits réservés
            </span>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{link.name}</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Vous pouvez ajouter les icônes SVG des réseaux sociaux ici */}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;