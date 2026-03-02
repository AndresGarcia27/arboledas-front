import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarCliente() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: ''
  });
  const [estado, setEstado] = useState({ loading: false, mensaje: '', error: false });

  // 1. PRECARGAR: Obtener los datos del cliente a editar
  useEffect(() => {
    const cargarCliente = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/clientes/${id}`);
        const data = await response.json();
        // Llenamos el formulario con los datos de la BD
        setFormData({ nombre: data.nombre, email: data.email, telefono: data.telefono });
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarCliente();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. ACTUALIZAR: Enviar los datos modificados al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado({ loading: true, mensaje: 'Actualizando...', error: false });

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clientes/${id}`, {
        method: 'PUT', // PUT para actualizar en Laravel
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('¡Cliente actualizado con éxito!');
        navigate('/clientes'); // Redirigimos de vuelta a la lista
      } else {
        setEstado({ loading: false, mensaje: 'Error al actualizar', error: true });
      }
    } catch (error) {
      setEstado({ loading: false, mensaje: 'Error de conexión', error: true });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Editar Cliente #{id}</h2>
      
      {estado.mensaje && (
        <div className={`p-3 mb-4 rounded ${estado.error ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
          {estado.mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" name="nombre" value={formData.nombre || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input type="tel" name="telefono" value={formData.telefono || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div className="flex gap-4 pt-2">
          <button type="button" onClick={() => navigate('/clientes')} className="w-full border py-2 rounded hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={estado.loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {estado.loading ? 'Guardando...' : 'Actualizar'}
          </button>
        </div>
      </form>
    </div>
  );
}