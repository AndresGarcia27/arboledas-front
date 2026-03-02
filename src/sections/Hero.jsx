import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReservationModal } from '../components/ReservationModal';
import './Hero.css';
<Link to="/clientes" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-bold">
  Admin Clientes
</Link>

export const Hero = () => {
  const [isReservaOpen, setIsReservaOpen] = useState(false);

  return (
    <>
      <section id="inicio" className="hero">
        {/* Capa oscura para que el texto se lea bien sobre la foto */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">ARBOLEDA</h1>
          <div className="separator-line"></div>
          <p className="hero-subtitle">GASTRONOMÍA DE AUTOR</p>
          
          <button 
            className="btn-hero-reserve"
            onClick={() => setIsReservaOpen(true)}
          >
            Reservar Mesa
          </button>
        </div>
      </section>

      {/* Modal de Reserva (Invisible hasta hacer click) */}
      <ReservationModal 
        isOpen={isReservaOpen} 
        onClose={() => setIsReservaOpen(false)} 
      />
    </>
  );
};