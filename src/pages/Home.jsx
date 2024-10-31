import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const [activeTab, setActiveTab] = useState('patient');
  const [scrollY, setScrollY] = useState(0);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1 
      }
    }
  };

  // Intersection Observer hooks
  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: true });

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = {
    patient: [
      {
        icon: "🏥",
        title: "Accès rapide aux soins",
        description: "Trouvez un spécialiste et prenez rendez-vous en quelques clics"
      },
      {
        icon: "📅",
        title: "Gestion simplifiée",
        description: "Gérez tous vos rendez-vous médicaux depuis une seule interface"
      },
      {
        icon: "📋",
        title: "Dossier médical",
        description: "Accédez à votre historique médical en toute sécurité"
      }
    ],
    doctor: [
      {
        icon: "👥",
        title: "Gestion des patients",
        description: "Optimisez votre agenda et développez votre patientèle"
      },
      {
        icon: "💼",
        title: "Espace professionnel",
        description: "Un espace dédié pour gérer votre activité efficacement"
      },
      {
        icon: "📊",
        title: "Suivi d'activité",
        description: "Analysez votre activité avec des statistiques détaillées"
      }
    ]
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/path-to-your-bg-image.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: scrollY * 0.5
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/80 z-10" />
        
        <motion.div 
          className="relative z-20 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            La Santé de Demain
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Une plateforme innovante qui connecte patients et professionnels de santé
          </p>
          
          {/* Interactive Call-to-Action */}
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register/patient"
                className="bg-white text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition shadow-lg inline-block"
              >
                Espace Patient
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register/doctor"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-primary transition inline-block"
              >
                Espace Professionnel
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg 
            className="w-6 h-6 text-white"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 bg-gray-50" ref={ref1}>
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={inView1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                className={`px-6 py-3 rounded-full text-lg transition-all duration-300 ${
                  activeTab === 'patient' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('patient')}
              >
                Patient
              </button>
              <button
                className={`px-6 py-3 rounded-full text-lg transition-all duration-300 ${
                  activeTab === 'doctor' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('doctor')}
              >
                Professionnel
              </button>
            </div>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {features[activeTab].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
                variants={containerVariants}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Statistics Section */}
      <section className="py-20 bg-primary" ref={ref2}>
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10k+", label: "Patients" },
              { number: "1000+", label: "Médecins" },
              { number: "50k+", label: "Rendez-vous" },
              { number: "4.9/5", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center text-white"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Dynamic CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark" ref={ref3}>
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView3 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à nous rejoindre ?
          </h2>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register/patient"
                className="bg-white text-primary px-8 py-4 rounded-full font-medium inline-block shadow-lg"
              >
                Créer un compte patient
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register/doctor"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium inline-block"
              >
                Créer un compte professionnel
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;