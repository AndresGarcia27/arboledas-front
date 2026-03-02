import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Tus importaciones originales de diseño
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { Menu } from "./sections/Menu";
import { Chef } from "./sections/Chef";
import { Tradicion } from "./sections/Tradicion";
import { Contacto } from "./sections/Contacto";

// 2. Importaciones del CRUD conectado a Laravel
import RegistroCliente from './pages/RegistroCliente';
import ListadoClientes from './pages/ListadoClientes'; // NUEVO
import EditarCliente from './pages/EditarCliente';     // NUEVO

// 3. Tu página principal intacta
const InicioRestaurante = () => (
  <>
    <Navbar />
    <Hero />
    <Menu />
    <Chef />
    <Tradicion />
    <Contacto />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tu Landing Page (El restaurante) */}
        <Route path="/" element={<InicioRestaurante />} />
        
        {/* C - Create (Formulario de registro que ya tenías) */}
        <Route path="/registro" element={<RegistroCliente />} />
        
        {/* R & D - Read & Delete (Listado de clientes) */}
        <Route path="/clientes" element={<ListadoClientes />} />
        
        {/* U - Update (Formulario para editar) */}
        <Route path="/editar-cliente/:id" element={<EditarCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;