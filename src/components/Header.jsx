import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle2, Calendar, Menu, X } from 'lucide-react';
import logo from './../assets/logo.png'; // Chemin vers le fichier logo

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#0A2725] py-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-white text-xl font-semibold">Besbicare</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-[#22C993] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/login"
              className="text-white hover:text-[#22C993] transition-colors duration-200 flex items-center gap-2 text-base"
            >
              <UserCircle2 className="w-5 h-5" />
              <span>Se connecter</span>
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-[#22C993] transition-colors duration-200 flex items-center gap-2 text-base"
            >
              <Calendar className="w-5 h-5" />
              <span>Gérer mes RDV</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="text-white hover:text-[#22C993] transition-colors duration-200 flex items-center gap-2 text-base py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircle2 className="w-5 h-5" />
                <span>Se connecter</span>
              </Link>
              <Link
                to="/appointments"
                className="text-white hover:text-[#22C993] transition-colors duration-200 flex items-center gap-2 text-base py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="w-5 h-5" />
                <span>Gérer mes RDV</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
