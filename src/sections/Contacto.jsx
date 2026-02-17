import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import './Contacto.css';

export const Contacto = () => {
  return (
    <footer id="contacto" className="contacto-section">
      <div className="container">
        
        <div className="footer-grid">
          
          {/* Columna 1: Dirección */}
          <div className="footer-col">
            <h3>Visítanos</h3>
            <p className="address-item">
              <MapPin size={18} className="icon" />
              Calle 10A #43-07<br />El Poblado, Medellín
            </p>
            <p className="address-item">
              <Phone size={18} className="icon" />
              +57 (300) 123-4567
            </p>
            <button className="btn-reserve">Reservar Mesa</button>
          </div>

          {/* Columna 2: Horarios */}
          <div className="footer-col">
            <h3>Horarios</h3>
            <ul className="hours-list">
              <li><Clock size={16} className="icon-sm"/> <span>Mar - Jue:</span> 12:00 pm - 10:00 pm</li>
              <li><Clock size={16} className="icon-sm"/> <span>Vie - Sáb:</span> 12:00 pm - 11:30 pm</li>
              <li><Clock size={16} className="icon-sm"/> <span>Domingo:</span> 12:00 pm - 5:00 pm</li>
              <li className="closed">Lunes Cerrado</li>
            </ul>
          </div>

          {/* Columna 3: Redes y Mapa */}
          <div className="footer-col">
            <h3>Síguenos</h3>
            <div className="social-links">
              <a href="#"><Instagram /></a>
              <a href="#"><Facebook /></a>
            </div>
            {/* Mapa simulado */}
            <div className="map-placeholder">
              <span>Ver en Google Maps</span>
            </div>
          </div>

        </div>

        <div className="footer-copyright">
          <p>© 2026 Arboleda Restaurante. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};