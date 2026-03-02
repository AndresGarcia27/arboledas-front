import { useState } from 'react';

export default function RegistroCliente() {
  // 1. Definimos el estado con la estructura exacta que espera Laravel
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password_hash: ''
  });

  const [estadoPeticion, setEstadoPeticion] = useState({ loading: false, mensaje: '', error: false });

  // 2. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Función para enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setEstadoPeticion({ loading: true, mensaje: 'Registrando...', error: false });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/clientes', {
        method: 'POST', // Método para crear registros
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Importante para que Laravel devuelva errores en JSON
        },
        body: JSON.stringify(formData) // Convertimos el objeto a texto JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Código 200 o 201: Todo salió bien
        setEstadoPeticion({ loading: false, mensaje: '¡Cliente registrado con éxito!', error: false });
        
        // Opcional: Limpiar el formulario después de guardar
        setFormData({ nombre: '', email: '', telefono: '', password_hash: '' });
      } else {
        // Errores de validación de Laravel (ej. email duplicado)
        setEstadoPeticion({ loading: false, mensaje: data.message || 'Error al registrar', error: true });
      }
    } catch (error) {
      // Error de red (el servidor está apagado o bloqueó la petición)
      console.error('Error de conexión:', error);
      setEstadoPeticion({ loading: false, mensaje: 'Error de conexión con el servidor.', error: true });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Registro de Cliente</h2>
      
      {/* Mensajes de feedback para el usuario */}
      {estadoPeticion.mensaje && (
        <div className={`p-3 mb-4 rounded ${estadoPeticion.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {estadoPeticion.mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={estadoPeticion.loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {estadoPeticion.loading ? 'Guardando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}