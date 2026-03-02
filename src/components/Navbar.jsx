import { useState, useEffect } from 'react';
import { User } from 'lucide-react'; 
import { AuthModal } from './AuthModal'; // Asegúrate de tener este archivo creado
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Estado para abrir el login

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-content">
          {/* Logo a la izquierda */}
          <a href="#inicio" className="logo">ARBOLEDA</a>
          
          {/* Enlaces y Botón a la derecha (Todo en la misma fila) */}
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#carta">Carta</a></li>
            <li><a href="#chef">Chef</a></li>
            <li><a href="#tradicion">Tradición</a></li>
            <li><a href="#contacto">Contacto</a></li>
            
            {/* Separador vertical sutil (opcional) */}
            <li className="divider"></li>

            {/* Botón de Acceder */}
            <li>
              <button className="btn-login" onClick={() => setIsAuthOpen(true)}>
                <User size={16} />
                <span>Acceder</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* El Modal de Login (Invisible hasta que se activa) */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};