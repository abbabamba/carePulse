import React, { useState } from "react";
import logo from "../../assets/logo.png"; // Import explicite de l'image

const MenuBar = ({  onLogout, setActivePage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  const handleProfileClick = () => {
    // Si la page active est "profile", on retourne à "dashboard"
    setActivePage((currentPage) =>
      currentPage === "profile" ? "dashboard" : "profile"
    );
    setIsDropdownOpen(false); // Ferme le menu déroulant
  };

  return (
    <div className="bg-[#0A2725] text-white flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-2">
      <div className="bg-[#4caf50] w-10 h-10 rounded-full flex items-center justify-center">
  <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
</div>

        <span className="text-xl font-semibold">Besbicare</span>
      </div>

      <nav className="flex gap-6">
        <a href="/home" className="hover:underline">
        Tableau de bord
        </a>
       
        <a href="/messages" className="hover:underline">
        Mes Patients
        </a>
        <a
  href="#"
  className="hover:underline"
  onClick={() => setActivePage("appointments")}
>
  Rendez-vous
</a>

        <a href="/documents" className="hover:underline">
        Documents
        </a>
        <a href="/help" className="hover:underline">
        Messagerie
        </a>
      </nav>

      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
            {/* Icône utilisateur */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
            <button
              onClick={handleProfileClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Mon profil
            </button>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
