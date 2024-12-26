import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, Clock, Route, Navigation, Filter } from 'lucide-react';

// Correction: Définition des icônes avec des chemins relatifs corrects
const createCustomIcon = (iconUrl, iconSize) => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
    popupAnchor: [0, -iconSize[1]],
    // Ajout de shadowUrl pour éviter les erreurs de console
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });
};

// Définition des icônes avec gestion des cas par défaut
const icons = {
  user: createCustomIcon('/images/usercon.png', [32, 32]),
  pharmacy: createCustomIcon('/images/pharmacie.png', [32, 32]),
  clinic: createCustomIcon('/images/medecine.png', [32, 32]),
  hospital: createCustomIcon('/images/hospital.png', [32, 32]),
  doctors: createCustomIcon('/images/profile-icon.png', [32, 32]),
  default: createCustomIcon('/images/default-medical-icon.png', [32, 32])
};

const MedicalFacilityFinder = () => {
  const [facilities, setFacilities] = useState([]);
  const [position, setPosition] = useState([14.4974, -14.4524]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [route, setRoute] = useState(null);
  const [facilityType, setFacilityType] = useState('pharmacy');
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const specialties = [
    'tous',
    'général',
    'cardiologie',
    'pédiatrie',
    'dentisterie',
    'dermatologie',
    'ophtalmologie'
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = [pos.coords.latitude, pos.coords.longitude];
        setPosition(newPosition);
        fetchFacilities(newPosition[0], newPosition[1], facilityType);
      },
      () => {
        fetchFacilities(position[0], position[1], facilityType);
      }
    );
  }, [facilityType, showOpenOnly, selectedSpecialty]);

  const isCurrentlyOpen = (openingHours) => {
    if (!openingHours) return false;

    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() * 100 + now.getMinutes();

    const daysOpen = openingHours.split(';');
    const todayHours = daysOpen[day];

    if (!todayHours) return false;

    const [open, close] = todayHours.split('-').map(t => parseInt(t.replace(':', '')));
    return time >= open && time <= close;
  };

  const fetchFacilities = async (lat, lon, type) => {
    try {
      setLoading(true);
      const query = `
        [out:json];
        area["ISO3166-1"="SN"][admin_level=2]->.searchArea;
        (
          node["amenity"~"${type}|hospital|doctors"](around:10000,${lat},${lon});
          way["amenity"~"${type}|hospital|doctors"](around:10000,${lat},${lon});
          relation["amenity"~"${type}|hospital|doctors"](around:10000,${lat},${lon});
        );
        out center;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });

      if (!response.ok) {
        throw new Error('Problème lors de la récupération des données');
      }

      let data = await response.json();
      let facilitiesWithDistance = data.elements.slice(0, 50).map(facility => ({
        ...facility,
        distance: facility.lat && facility.lon ? calculateDistance(lat, lon, facility.lat, facility.lon) : null,
        isOpen: isCurrentlyOpen(facility.tags.opening_hours)
      }));

      if (showOpenOnly) {
        facilitiesWithDistance = facilitiesWithDistance.filter(f => f.isOpen);
      }

      if (selectedSpecialty !== 'all') {
        facilitiesWithDistance = facilitiesWithDistance.filter(f =>
          f.tags.healthcare === selectedSpecialty ||
          f.tags.specialty === selectedSpecialty
        );
      }

      facilitiesWithDistance.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

      setFacilities(facilitiesWithDistance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const fetchRoute = async (start, end) => {
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
      const data = await response.json();
      setRoute(data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]));
    } catch (err) {
      console.error("Erreur lors de la récupération de l'itinéraire", err);
    }
  };

  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, 13);
    return null;
  }

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    fetchRoute(position, [facility.lat, facility.lon]);
  };

  const openGoogleMapsDirections = (facility) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${position[0]},${position[1]}&destination=${facility.lat},${facility.lon}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`;
    }
    return `${distance.toFixed(2)} km`;
  };

  const getFacilityIcon = (facility) => {
    // Amélioration de la logique de sélection des icônes
    const amenity = facility.tags.amenity;

    // Vérification plus précise du type d'établissement
    if (facility.tags.healthcare === 'hospital' || amenity === 'hospital') {
      return icons.hospital;
    }

    if (facility.tags.healthcare === 'doctor' || amenity === 'doctors' ||
        facility.tags.healthcare === 'clinic' || amenity === 'clinic') {
      // Distinction entre docteur individuel et clinique
      if (facility.tags.healthcare === 'clinic' || amenity === 'clinic') {
        return icons.clinic;
      }
      return icons.doctors;
    }

    if (facility.tags.healthcare === 'pharmacy' || amenity === 'pharmacy') {
      return icons.pharmacy;
    }

    // Icône par défaut si aucun type ne correspond
    return icons.default;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-[#0A2725]"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded shadow-lg" role="alert">
        <p className="font-bold text-red-800">Erreur</p>
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-[#0A2725] text-white p-6 shadow-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Établissements médicaux à proximité</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 ease-in-out"
          >
            <Filter className="mr-2" size={20} />
            Filtres
          </button>
        </div>

        {isFilterOpen && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-xl text-gray-800 max-w-7xl mx-auto transform transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-[#0A2725]">Type d'établissement</h3>
                <div className="flex flex-wrap gap-2">
                  {['pharmacy', 'clinic', 'hospital', 'doctors'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFacilityType(type)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                        facilityType === type
                          ? 'bg-[#0A2725] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[#0A2725]">Spécialité</h3>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#0A2725] focus:ring-2 focus:ring-[#0A2725]/20 transition-all duration-300 ease-in-out"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-[#0A2725]">Statut</h3>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showOpenOnly}
                      onChange={(e) => setShowOpenOnly(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0A2725] transition-all duration-300 ease-in-out"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4"></div>
                  </div>
                  <span className="text-gray-700">Ouvert actuellement uniquement</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 overflow-y-auto p-4 bg-white shadow-lg">
          {facilities.map(facility => (
            <div
              key={facility.id}
              className={`mb-4 rounded-xl p-5 cursor-pointer transition-all duration-300 ease-in-out ${
                selectedFacility?.id === facility.id
                  ? 'bg-[#0A2725] text-white shadow-lg transform scale-[1.02]'
                  : 'bg-white hover:bg-[#0A2725]/5 shadow'
              }`}
              onClick={() => handleFacilityClick(facility)}
            >
              <h2 className={`text-lg font-semibold ${
                selectedFacility?.id === facility.id ? 'text-white' : 'text-[#0A2725]'
              }`}>
                {facility.tags.name || `${facilityType} sans nom`}
              </h2>

              <div className="mt-3 flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  facility.isOpen
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {facility.isOpen ? 'Ouvert' : 'Fermé'}
                </span>
                {facility.distance !== null && (
                  <span className={`ml-3 text-sm ${
                    selectedFacility?.id === facility.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {formatDistance(facility.distance)}
                  </span>
                )}
              </div>

              {facility.tags.phone && (
                <p className={`flex items-center mt-3 ${
                  selectedFacility?.id === facility.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                  <Phone className="mr-2" size={16} />
                  {facility.tags.phone}
                </p>
              )}

              {facility.tags['opening_hours'] && (
                <p className={`flex items-center mt-2 ${
                  selectedFacility?.id === facility.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                  <Clock className="mr-2" size={16} />
                  {facility.tags['opening_hours']}
                </p>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openGoogleMapsDirections(facility);
                }}
                className={`mt-4 px-4 py-2 rounded-lg flex items-center justify-center w-full transition-all duration-300 ease-in-out ${
                  selectedFacility?.id === facility.id
                    ? 'bg-white text-[#0A2725] hover:bg-gray-100'
                    : 'bg-[#0A2725] text-white hover:bg-[#0A2725]/90'
                }`}
              >
                <Route className="mr-2" size={16} />
                Itinéraire
              </button>
            </div>
          ))}
        </div>

        <div className="w-2/3 relative shadow-xl">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position} icon={icons.user}>
              <Popup>Vous êtes ici</Popup>
            </Marker>
            {facilities.map((facility) => (
              <Marker
                key={facility.id}
                position={[facility.lat, facility.lon]}
                icon={getFacilityIcon(facility)}
              >
                <Popup>
                  <h2>{facility.tags.name || `${facilityType} sans nom`}</h2>
                  {facility.distance !== null ? (
                    <p>Distance: {formatDistance(facility.distance)}</p>
                  ) : (
                    <p>Distance: Non disponible</p>
                  )}
                  <button
                    onClick={() => openGoogleMapsDirections(facility)}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center w-full hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    <Navigation className="mr-2" size={16} />
                    Itinéraire
                  </button>
                </Popup>
              </Marker>
            ))}
            {route && <Polyline positions={route} color="blue" />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacilityFinder;
