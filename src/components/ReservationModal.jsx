import { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import './ReservationModal.css';

export const ReservationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1 = Formulario, 2 = Confirmación

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real de backend
    setStep(2); // Pasamos a la pantalla de éxito
  };

  return (
    <div className="reservation-overlay" onClick={onClose}>
      <div className="reservation-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-res" onClick={onClose}>
          <X size={24} />
        </button>

        {step === 1 ? (
          <>
            <div className="res-header">
              <h2>Reservar Mesa</h2>
              <p>Vive la experiencia Arboleda.</p>
            </div>

            <form className="res-form" onSubmit={handleSubmit}>
              {/* Selector de Fecha */}
              <div className="input-row">
                <label><Calendar size={16} /> Fecha</label>
                <input type="date" required className="res-input" />
              </div>

              {/* Selector de Hora */}
              <div className="input-row">
                <label><Clock size={16} /> Hora</label>
                <select required className="res-input">
                  <option value="">Selecciona hora</option>
                  <option>12:00 PM</option>
                  <option>1:30 PM</option>
                  <option>7:00 PM</option>
                  <option>8:30 PM</option>
                  <option>10:00 PM</option>
                </select>
              </div>

              {/* Número de Personas */}
              <div className="input-row">
                <label><Users size={16} /> Personas</label>
                <select required className="res-input">
                  <option value="2">2 Personas</option>
                  <option value="3">3 Personas</option>
                  <option value="4">4 Personas</option>
                  <option value="5">5 Personas</option>
                  <option value="6">6+ (Grupo)</option>
                </select>
              </div>

              <button type="submit" className="btn-confirm">
                Confirmar Reserva
              </button>
            </form>
          </>
        ) : (
          /* PANTALLA DE ÉXITO */
          <div className="res-success">
            <CheckCircle size={60} color="#D4AF37" className="success-icon" />
            <h2>¡Reserva Confirmada!</h2>
            <p>Hemos enviado los detalles a tu correo.</p>
            <button className="btn-close-modal" onClick={onClose}>Entendido</button>
          </div>
        )}
      </div>
    </div>
  );
};