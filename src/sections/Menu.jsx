import { useState } from 'react';
import { X, ScrollText, ShoppingBag, Check } from 'lucide-react';
import './Menu.css';

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('entradas');
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Lógica del Pedido
  const handleOrder = (dishName) => {
    setNotification(`Se agregó "${dishName}" a tu pedido.`);
    setTimeout(() => setNotification(null), 3000);
  };

  // 1. AHORA TENEMOS 5 CATEGORÍAS SEPARADAS
  const categories = [
    { id: 'entradas', label: 'Entradas' },
    { id: 'fuertes', label: 'Platos Fuertes' },
    { id: 'postres', label: 'Postres' },
    { id: 'bebidas', label: 'Bebidas' }, // Sin alcohol
    { id: 'licores', label: 'Licores' }  // Con alcohol
  ];

  // 2. DATOS DE LOS PLATOS Y BEBIDAS
  const previewItems = {
    entradas: [
      { id: 1, name: "Ceviche de Mango Biche", desc: "Mango biche, leche de tigre de coco.", price: "$28.000", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop" },
      { id: 2, name: "Carpaccio de Res", desc: "Lomito fino, alcaparras y trufa.", price: "$35.000", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" },
      { id: 3, name: "Chicharrones de Pulpo", desc: "Pulpo crocante con papa criolla.", price: "$42.000", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop" }
    ],
    fuertes: [
      { id: 4, name: "Lomo al Trapo", desc: "Solomito envuelto en tela con sal marina.", price: "$65.000", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" },
      { id: 5, name: "Salmón Cítrico", desc: "Salsa de maracuyá y puré criollo.", price: "$58.000", img: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=600&auto=format&fit=crop" },
      { id: 6, name: "Risotto de Setas", desc: "Arroz arborio y hongos silvestres.", price: "$48.000", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=600&auto=format&fit=crop" }
    ],
    postres: [
      { id: 7, name: "Volcán de Chocolate", desc: "Bizcocho tibio con helado.", price: "$22.000", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop" },
      { id: 8, name: "Cheesecake de Frutos", desc: "Reducción de moras silvestres.", price: "$20.000", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop" },
      { id: 9, name: "Milhoja de Arequipe", desc: "Capas crocantes hechas en casa.", price: "$18.000", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop" }
    ],
    // --- SECCIÓN BEBIDAS (Sin Alcohol) ---
    bebidas: [
      { id: 10, name: "Limonada de Coco", desc: "Cremosa, con leche de coco natural y limón.", price: "$14.000", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" },
      { id: 11, name: "Soda de Frutos Rojos", desc: "Agua con gas, reducción de moras y yerbabuena.", price: "$12.000", img: "https://images.unsplash.com/photo-1530598342240-278550186196?q=80&w=600&auto=format&fit=crop" },
      { id: 12, name: "Jugo de Maracuyá", desc: "Pulpa natural en agua o leche.", price: "$10.000", img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop" }
    ],
    // --- SECCIÓN LICORES (Con Alcohol) ---
    licores: [
      { id: 13, name: "Gin Tonic Botánico", desc: "Ginebra premium, tónica artesanal y especias.", price: "$35.000", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop" },
      { id: 14, name: "Vino Tinto Malbec", desc: "Copa de reserva, notas de madera y frutos rojos.", price: "$28.000", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop" },
      { id: 15, name: "Margarita de Lulo", desc: "Tequila reposado, lulo fresco y borde de sal.", price: "$32.000", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop" }
    ]
  };

  // 3. CARTA COMPLETA (MODAL) SEPARADA TAMBIÉN
  const fullMenu = {
    "Entradas & Compartir": previewItems.entradas.map(i => ({name: i.name, price: i.price})),
    "Platos Fuertes": previewItems.fuertes.map(i => ({name: i.name, price: i.price})),
    "Postres": previewItems.postres.map(i => ({name: i.name, price: i.price})),
    "Bebidas Refrescantes": [
        { name: "Limonada de Coco", price: "$14.000" },
        { name: "Limonada Cerezada", price: "$12.000" },
        { name: "Sodas Saborizadas", price: "$12.000" },
        { name: "Agua San Pellegrino", price: "$15.000" },
        { name: "Jugos Naturales", price: "$10.000" }
    ],
    "Licores & Cocteles": [
        { name: "Gin Tonic Botánico", price: "$35.000" },
        { name: "Margarita de Lulo", price: "$32.000" },
        { name: "Old Fashioned", price: "$38.000" },
        { name: "Mojito Clásico", price: "$30.000" },
        { name: "Vino Tinto (Copa)", price: "$28.000" },
        { name: "Cerveza Artesanal", price: "$18.000" }
    ]
  };

  return (
    <section id="carta" className="menu-section">
      <div className="container">
        <div className="section-badge"></div>
        <h2>Nuestra Carta</h2>
        <p className="subtitle">Una exploración de sabores locales con técnicas globales.</p>
        
        {/* PESTAÑAS (Ahora son 5 botones) */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* REJILLA DE PLATOS */}
        <div className="menu-grid">
           {previewItems[activeCategory].map((item) => (
             <div key={item.id} className="menu-item fade-in">
               <div className="menu-image-container">
                 <img src={item.img} alt={item.name} />
               </div>
               <div className="menu-text">
                 <div className="menu-header">
                   <h3>{item.name}</h3>
                   <span className="price">{item.price}</span>
                 </div>
                 <p>{item.desc}</p>
                 
                 {/* BOTÓN PEDIR */}
                 <button 
                   className="btn-order"
                   onClick={() => handleOrder(item.name)}
                 >
                   <ShoppingBag size={16} />
                   Pedir
                 </button>

               </div>
             </div>
           ))}
        </div>

        {/* BOTÓN CARTA COMPLETA */}
        <div className="full-menu-container">
            <button className="btn-full-menu" onClick={() => setShowModal(true)}>
              <ScrollText size={20} style={{ marginRight: '10px' }} />
              Ver Carta Completa
            </button>
        </div>
      </div>

      {/* NOTIFICACIÓN */}
      {notification && (
        <div className="order-notification">
          <Check size={20} />
          {notification}
        </div>
      )}

      {/* MODAL CARTA COMPLETA */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              <X size={28} />
            </button>
            <div className="modal-header">
              <h2>ARBOLEDA</h2>
              <p>MENÚ DE DEGUSTACIÓN</p>
            </div>
            <div className="modal-body">
              {Object.entries(fullMenu).map(([category, items]) => (
                <div key={category} className="full-menu-category">
                  <h3>{category}</h3>
                  <ul>{items.map((item, index) => (
                      <li key={index}>
                        <span className="dish-name">{item.name}</span>
                        <div className="dotted-line"></div>
                        <span className="dish-price">{item.price}</span>
                      </li>
                  ))}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};