import React, { useState } from 'react';

const Connexion = () => {
  const [etat, setEtat] = useState('S\'inscrire');
  const [typeUtilisateur, setTypeUtilisateur] = useState('patient');
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    email: '',
    motDePasse: '',
    prenom: '',
    nom: '',
    specialite: '',
    numeroLicence: ''
  });

  const handleInputChange = (e) => {
    setDonneesFormulaire({
      ...donneesFormulaire,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (etat === 'S\'inscrire') {
      try {
        const endpoint = typeUtilisateur === 'patient'
          ? 'https://backend-app-medecal.onrender.com/api/users/register/patient'
          : 'https://backend-app-medecal.onrender.com/api/users/register/medecin';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donneesFormulaire),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Inscription réussie!');
          // Réinitialiser le formulaire ou rediriger
        } else {
          alert(`Erreur: ${data.message || 'Une erreur est survenue'}`);
        }
      } catch (error) {
        alert('Erreur de connexion au serveur');
      }
    }
    // Ajouter la logique de connexion ici pour le cas else
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border text-secondary rounded-xl text-sm shadow-lg">
        <p className="text-2xl font-semibold">{etat === "S\'inscrire" ? "Créer un compte" : "Connexion"}</p>
        <p>Veuillez {etat === "S\'inscrire" ? "vous inscrire" : "vous connecter"} pour prendre rendez-vous</p>

        {etat === "S\'inscrire" && (
          <div className="w-full mb-4">
            <p className="mb-2">Je suis un :</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="typeUtilisateur"
                  value="patient"
                  checked={typeUtilisateur === 'patient'}
                  onChange={(e) => setTypeUtilisateur(e.target.value)}
                  className="text-primary"
                />
                Patient
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="typeUtilisateur"
                  value="medecin"
                  checked={typeUtilisateur === 'medecin'}
                  onChange={(e) => setTypeUtilisateur(e.target.value)}
                  className="text-primary"
                />
                Médecin
              </label>
            </div>
          </div>
        )}

        {etat === "S\'inscrire" && (
          <>
            <div className="w-full">
              <p>Prénom</p>
              <input
                className="border border-primary rounded w-full p-2 mt-1"
                type="text"
                name="prenom"
                onChange={handleInputChange}
                value={donneesFormulaire.prenom}
                required
              />
            </div>
            <div className="w-full">
              <p>Nom</p>
              <input
                className="border border-primary rounded w-full p-2 mt-1"
                type="text"
                name="nom"
                onChange={handleInputChange}
                value={donneesFormulaire.nom}
                required
              />
            </div>
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-primary rounded w-full p-2 mt-1"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={donneesFormulaire.email}
            required
          />
        </div>

        <div className="w-full">
          <p>Mot de passe</p>
          <input
            className="border border-primary rounded w-full p-2 mt-1"
            type="password"
            name="motDePasse"
            onChange={handleInputChange}
            value={donneesFormulaire.motDePasse}
            required
          />
        </div>

        {etat === "S\'inscrire" && typeUtilisateur === "medecin" && (
          <>
            <div className="w-full">
              <p>Spécialité</p>
              <input
                className="border border-primary rounded w-full p-2 mt-1"
                type="text"
                name="specialite"
                onChange={handleInputChange}
                value={donneesFormulaire.specialite}
                required
              />
            </div>
            <div className="w-full">
              <p>Numéro de Licence</p>
              <input
                className="border border-primary rounded w-full p-2 mt-1"
                type="text"
                name="numeroLicence"
                onChange={handleInputChange}
                value={donneesFormulaire.numeroLicence}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="bg-secondary text-primary w-full py-2 rounded-full text-base mt-4">
          {etat === "S\'inscrire" ? "Créer un compte" : "Connexion"}
        </button>

        {etat === "S\'inscrire"
          ? <p>Vous avez déjà un compte? <span onClick={() => setEtat('Connexion')} className="text-primary underline font-bold cursor-pointer">connectez-vous ici</span></p>
          : <p>Créer un nouveau compte? <span onClick={() => setEtat('S\'inscrire')} className="text-primary underline font-bold cursor-pointer">cliquez ici</span></p>
        }
      </div>
    </form>
  );
};

export default Connexion;
