import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoClientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 1. LEER: Obtener los datos del backend
  const obtenerClientes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/clientes');
      const data = await response.json();
      setClientes(data);
      setCargando(false);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // 2. BORRAR: Eliminar un registro
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres borrar este cliente?')) {
      try {
        await fetch(`http://127.0.0.1:8000/api/clientes/${id}`, {
          method: 'DELETE',
        });
        // Actualizamos la lista después de borrar
        obtenerClientes(); 
        alert('Cliente borrado con éxito');
      } catch (error) {
        console.error('Error al borrar:', error);
      }
    }
  };

  if (cargando) return <div className="p-10 text-center">Cargando clientes...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-sm">
      
      {/* --- AQUÍ ESTÁ LA MODIFICACIÓN DEL PASO 2 --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {/* Botón para volver al restaurante */}
          <Link to="/" className="text-gray-500 hover:text-gray-800 font-semibold transition-colors">
            ← Volver al Restaurante
          </Link>
          <h2 className="text-2xl font-bold border-l-2 pl-4 border-gray-300">Gestión de Clientes</h2>
        </div>
        <Link to="/registro" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          + Nuevo Cliente
        </Link>
      </div>
      {/* ------------------------------------------- */}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{cliente.id}</td>
                  <td className="p-3">{cliente.nombre}</td>
                  <td className="p-3">{cliente.email}</td>
                  <td className="p-3">{cliente.telefono}</td>
                  <td className="p-3 flex justify-center gap-2">
                    {/* Botón Editar */}
                    <Link to={`/editar-cliente/${cliente.id}`} className="text-blue-600 hover:text-blue-800 border border-blue-600 px-2 py-1 rounded">
                      Editar
                    </Link>
                    {/* Botón Borrar */}
                    <button onClick={() => handleDelete(cliente.id)} className="text-red-600 hover:text-red-800 border border-red-600 px-2 py-1 rounded">
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No hay clientes registrados aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}