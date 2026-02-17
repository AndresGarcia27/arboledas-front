import { Navbar } from "./components/Navbar"; // <-- Importante
import { Hero } from "./sections/Hero";
import { Menu } from "./sections/Menu";
import { Chef } from "./sections/Chef";
import { Tradicion } from "./sections/Tradicion";
import { Contacto } from "./sections/Contacto";

function App() {
  return (
    <>
      <Navbar />  {/* <-- Aquí va la barra arriba de todo */}
      <Hero />
      <Menu />
      <Chef />
      <Tradicion />
      <Contacto />
    </>
  );
}

export default App;