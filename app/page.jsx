'use client';
import React, { useState, useEffect } from 'react';
import { 
  Train, 
  Store, 
  UserCheck, 
  Code, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Filter, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';

// --- DATOS DE HORARIOS DEL TREN SOLAR ---
const TRAIN_SCHEDULES = {
  rutaA: {
    title: "Ruta A (Frecuencia Principal)",
    ida: [
      { station: "Volcán", salida: "09:00", llegada: "-" },
      { station: "Purmamarca", llegada: "09:50", salida: "12:15" },
      { station: "Maimará", llegada: "12:55", salida: "13:55" },
      { station: "Tilcara", llegada: "14:10", salida: "-" }
    ],
    vuelta: [
      { station: "Tilcara", salida: "15:50", llegada: "-" },
      { station: "Maimará", llegada: "16:05", salida: "16:10" },
      { station: "Hornillos", llegada: "16:20", salida: "17:20" },
      { station: "Tumbaya", llegada: "18:20", salida: "19:20" },
      { station: "Volcán", llegada: "19:40", salida: "-" }
    ]
  },
  rutaB: {
    title: "Ruta B (Frecuencia Secundaria / Extendida)",
    ida: [
      { station: "Volcán", salida: "10:00", llegada: "-" },
      { station: "Tumbaya", llegada: "10:20", salida: "11:20" },
      { station: "Purmamarca", llegada: "11:50", salida: "14:15" },
      { station: "Hornillos", llegada: "14:45", salida: "15:45" },
      { station: "Maimará", llegada: "15:55", salida: "16:55" },
      { station: "Tilcara", llegada: "17:10", salida: "-" }
    ],
    vuelta: [
      { station: "Tilcara", salida: "18:50", llegada: "-" },
      { station: "Maimará", llegada: "19:05", salida: "19:05" },
      { station: "Hornillos", llegada: "19:15", salida: "19:15" },
      { station: "Purmamarca", llegada: "19:45", salida: "19:50" },
      { station: "Tumbaya", llegada: "20:20", salida: "20:20" },
      { station: "Volcán", llegada: "20:40", salida: "-" }
    ]
  }
};

const STATIONS = ["Todas", "Volcán", "Tumbaya", "Purmamarca", "Hornillos", "Maimará", "Tilcara"];

// --- DATOS INICIALES MOCK DE VENDEDORES Y PRODUCTOS ---
const INITIAL_VENDORS = [
  {
    id: "v1",
    name: "Doña Santos Maimara",
    category: "Artesano",
    station: "Purmamarca",
    whatsapp: "+5493884123456",
    isAvailable: true,
    bio: "Tejedora ancestral con lana de llama hilada a mano y tintes naturales de la quebrada.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    products: [
      { id: "p1", name: "Poncho Llama Purmamarqueño", price: 45000, desc: "Poncho tejido en telar criollo, 100% fibra de llama natural.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400" },
      { id: "p2", name: "Manta de Guardas Quebradeñas", price: 32000, desc: "Manta rustica ideal para sofá o abrigo con motivos de los cerros.", img: "https://images.unsplash.com/photo-1606760227091-3dd858d9721b?auto=format&fit=crop&q=80&w=400" },
      { id: "p3", name: "Gorro Chullo con Orejeras", price: 9500, desc: "Abrigado e hilado a mano, varios colores andinos.", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=400" }
    ]
  },
  {
    id: "v2",
    name: "Don Mateo Apaza",
    category: "Agricultor",
    station: "Maimará",
    whatsapp: "+5493885987654",
    isAvailable: true,
    bio: "Agricultor de la Paleta del Pintor. Cultivo ecológico de papas andinas y maíces nativos.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    products: [
      { id: "p4", name: "Malla de Papas Andinas Mixtas (3kg)", price: 6500, desc: "Variedades cuarentona, oca y collareja recien cosechadas.", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400" },
      { id: "p5", name: "Maíz Morado para Chicha (1kg)", price: 3500, desc: "Granos orgánicos secados al sol de Maimará.", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400" },
      { id: "p6", name: "Frasco Dulce de CAYOTE Casero", price: 4200, desc: "Elaborado con cayotes del huerto propio y azúcar de caña.", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400" }
    ]
  },
  {
    id: "v3",
    name: "Artesanías Tilcara - Mama Quilla",
    category: "Artesano",
    station: "Tilcara",
    whatsapp: "+5493884888999",
    isAvailable: false,
    bio: "Taller cerámico familiar. Recreación de vasijas y cuencos omaguacas.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    products: [
      { id: "p7", name: "Cuenco Cerámico Tilcareño", price: 11000, desc: "Modelado a mano en arcilla roja cocida en horno de barro.", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400" },
      { id: "p8", name: "Sahumador Andino Barro", price: 8500, desc: "Ideal para palo santo y copal, grabado con soles andinos.", img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400" }
    ]
  },
  {
    id: "v4",
    name: "Finca Tumbaya - Hierbas y Especias",
    category: "Agricultor",
    station: "Tumbaya",
    whatsapp: "+5493884777111",
    isAvailable: true,
    bio: "Hierbas medicinales y condimentos aromáticos cultivados a la vera del Río Grande.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    products: [
      { id: "p9", name: "Mix de Hierbas para Mate (Muña Muña y Rica Rica)", price: 2800, desc: "Recolectadas en la alta sierra de Tumbaya.", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400" },
      { id: "p10", name: "Pimentón Dulce Cachi/Tumbaya", price: 3400, desc: "Pimiento secado y molido en piedra tradicional.", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400" }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'vendor' | 'schedules' | 'backend'
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  
  // Filtros del catálogo
  const [selectedStation, setSelectedStation] = useState('Todas');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Estado del Vendedor en la vista simulada (usamos v1 por defecto)
  const [currentVendorId, setCurrentVendorId] = useState('v1');
  const currentVendor = vendors.find(v => v.id === currentVendorId) || vendors[0];

  // Nuevo Producto Modal/State para el vendedor
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('');

  // Estado para la modal de WhatsApp / Confirmación de Pedido
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderVendor, setOrderVendor] = useState(null);
  const [passengerTrainRoute, setPassengerTrainRoute] = useState('Ruta A - IDA');

  // Toggle Stock Vendedor
  const toggleVendorStock = (vendorId) => {
    setVendors(prev => prev.map(v => {
      if (v.id === vendorId) {
        return { ...v, isAvailable: !v.isAvailable };
      }
      return v;
    }));
  };

  // Agregar Producto Vendedor
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    if (currentVendor.products.length >= 6) {
      alert("Alcanzaste el límite de 6 productos para el catálogo express.");
      return;
    }

    const newProd = {
      id: "p_" + Date.now(),
      name: newProdName,
      price: parseFloat(newProdPrice),
      desc: newProdDesc || "Producto artesanal o fresco directo de la Quebrada.",
      img: newProdImg || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400"
    };

    setVendors(prev => prev.map(v => {
      if (v.id === currentVendorId) {
        return { ...v, products: [...v.products, newProd] };
      }
      return v;
    }));

    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    setNewProdImg('');
  };

  // Eliminar producto
  const handleDeleteProduct = (prodId) => {
    setVendors(prev => prev.map(v => {
      if (v.id === currentVendorId) {
        return { ...v, products: v.products.filter(p => p.id !== prodId) };
      }
      return v;
    }));
  };

  // Vendedores filtrados para el Turista
  const filteredVendors = vendors.filter(vendor => {
    if (!vendor.isAvailable) return false; // Solo disponibles
    if (selectedStation !== 'Todas' && vendor.station !== selectedStation) return false;
    if (selectedCategory !== 'Todas' && vendor.category !== selectedCategory) return false;
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = vendor.name.toLowerCase().includes(query);
      const matchProduct = vendor.products.some(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
      return matchName || matchProduct;
    }
    return true;
  });

  // Generador de Mensaje de WhatsApp
  const generateWhatsAppLink = (vendor, product, routeInfo) => {
    const text = `Hola ${vendor.name}! 🚂 Viajo en el Tren Solar (${routeInfo}). Me gustaría encargar: "${product.name}" ($${product.price.toLocaleString('es-AR')}). ¿Nos encontramos en la estación de ${vendor.station} cuando pare el tren para la entrega? Gracias!`;
    return `https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] text-stone-800 font-sans flex flex-col">
      {/* HEADER PRINCIPAL */}
      <header className="bg-gradient-to-r from-[#B85B32] via-[#C86A3C] to-[#8C3A27] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400/20 backdrop-blur-md rounded-xl border border-amber-300/30">
              <Train className="w-7 h-7 text-amber-200 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
                Tren Solar <span className="text-amber-300 text-xs uppercase px-2 py-0.5 bg-amber-900/40 rounded-full border border-amber-400/30">Mercado en Estación</span>
              </h1>
              <p className="text-xs text-amber-100/80">Quebrada de Humahuaca • Jujuy, Argentina</p>
            </div>
          </div>

          {/* NAVEGACIÓN */}
          <nav className="flex items-center bg-black/20 p-1 rounded-xl border border-white/10 text-xs sm:text-sm font-medium">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'catalog' ? 'bg-amber-100 text-[#8C3A27] font-semibold shadow-sm' : 'text-amber-100 hover:text-white hover:bg-white/10'}`}
            >
              <ShoppingBag className="w-4 h-4" /> Catálogo Pasajeros
            </button>
            <button 
              onClick={() => setActiveTab('vendor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'vendor' ? 'bg-amber-100 text-[#8C3A27] font-semibold shadow-sm' : 'text-amber-100 hover:text-white hover:bg-white/10'}`}
            >
              <Store className="w-4 h-4" /> Panel Vendedor
            </button>
            <button 
              onClick={() => setActiveTab('schedules')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'schedules' ? 'bg-amber-100 text-[#8C3A27] font-semibold shadow-sm' : 'text-amber-100 hover:text-white hover:bg-white/10'}`}
            >
              <Clock className="w-4 h-4" /> Horarios Tren
            </button>
            <button 
              onClick={() => setActiveTab('backend')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'backend' ? 'bg-amber-100 text-[#8C3A27] font-semibold shadow-sm' : 'text-amber-100 hover:text-white hover:bg-white/10'}`}
            >
              <Code className="w-4 h-4" /> Código Next.js
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* TAB 1: CATÁLOGO DINÁMICO PARA TURISTAS */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Banner Informativo */}
            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 p-4 sm:p-6 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#B85B32] bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" /> Compra Local en Trayecto
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Comprá a artesanos y agricultores mientras viajás
                </h2>
                <p className="text-sm text-stone-600 max-w-2xl">
                  Seleccioná tu producto, coordiná por WhatsApp y el productor local te esperará en el andén de la estación con tu pedido listo en el horario estipulado de parada.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('schedules')}
                className="whitespace-nowrap px-4 py-2 bg-[#B85B32] text-white text-xs font-semibold rounded-xl hover:bg-[#A04E29] transition-all shadow-sm flex items-center gap-2"
              >
                Ver Cronograma de Trenes <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Filtros de Estación y Categoría */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                {/* Buscador */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar ponchos, papas andinas, vasijas, agricultores..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B85B32]/30 focus:border-[#B85B32]"
                  />
                </div>

                {/* Categoría */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                  <span className="text-xs font-medium text-stone-500 uppercase flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Tipo:
                  </span>
                  {["Todas", "Artesano", "Agricultor"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${selectedCategory === cat ? 'bg-[#8C3A27] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Estación estilo Tags */}
              <div className="pt-2 border-t border-stone-100">
                <span className="text-xs font-medium text-stone-500 uppercase flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B85B32]" /> Filtrar por Estación de Entrega:
                </span>
                <div className="flex flex-wrap gap-2">
                  {STATIONS.map((station) => (
                    <button
                      key={station}
                      onClick={() => setSelectedStation(station)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                        selectedStation === station 
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                    >
                      {station === "Todas" ? "🚉 Todas las Estaciones" : `Estación ${station}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Listado de Vendedores y sus Productos */}
            {filteredVendors.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
                <Store className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-stone-700">No hay vendedores disponibles en esta estación o categoría</h3>
                <p className="text-sm text-stone-500 max-w-md mx-auto mt-1">
                  Es posible que los productores locales no estén presentes hoy en el andén o no coincidan con la búsqueda actual. Proba cambiando de estación.
                </p>
                <button 
                  onClick={() => { setSelectedStation('Todas'); setSelectedCategory('Todas'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-200"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredVendors.map((vendor) => (
                  <div key={vendor.id} className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden hover:border-amber-300/80 transition-all">
                    {/* Header Vendedor */}
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-50 to-amber-50/40 border-b border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={vendor.avatar} 
                          alt={vendor.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-stone-900 text-base sm:text-lg">{vendor.name}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              vendor.category === 'Artesano' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {vendor.category}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#B85B32]" /> Estación habitual: <strong className="text-stone-700 font-medium">{vendor.station}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Presente hoy en andén
                        </span>
                      </div>
                    </div>

                    {/* Descripción Vendedor */}
                    <p className="px-5 py-2.5 text-xs text-stone-600 bg-stone-50/50 border-b border-stone-100 italic">
                      "{vendor.bio}"
                    </p>

                    {/* Grilla de Productos del Vendedor (hasta 6) */}
                    <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {vendor.products.map((product) => (
                        <div key={product.id} className="group bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                          <div>
                            <div className="relative h-40 bg-stone-100 overflow-hidden">
                              <img 
                                src={product.img} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg">
                                ${product.price.toLocaleString('es-AR')}
                              </div>
                            </div>
                            <div className="p-3.5 space-y-1">
                              <h4 className="font-bold text-stone-800 text-sm group-hover:text-[#B85B32] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                                {product.desc}
                              </p>
                            </div>
                          </div>

                          <div className="p-3.5 pt-0">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setOrderVendor(vendor);
                              }}
                              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                              <Phone className="w-3.5 h-3.5" /> Pedir para retirar en parada
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PANEL DE CONTROL DEL VENDEDOR */}
        {activeTab === 'vendor' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Selector de Perfil Simulado */}
            <div className="bg-amber-900 text-amber-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <UserCheck className="w-4 h-4 text-amber-300" />
                <span>Simulando sesión como:</span>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={currentVendorId}
                  onChange={(e) => setCurrentVendorId(e.target.value)}
                  className="bg-amber-950 text-white text-xs font-medium py-1.5 px-3 rounded-lg border border-amber-700 focus:outline-none"
                >
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.station})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dashboard Vendedor */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
              {/* Header Vendedor */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-stone-200">
                <div>
                  <span className="text-xs font-bold text-[#B85B32] uppercase tracking-wider">Perfil de Vendedor Local</span>
                  <h2 className="text-2xl font-bold text-stone-900">{currentVendor.name}</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Estación asignada: <strong>{currentVendor.station}</strong> • Categoría: <strong>{currentVendor.category}</strong></p>
                </div>

                {/* SWITCH DISPONIBILIDAD DIA A DIA */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-4 w-full sm:w-auto justify-between">
                  <div>
                    <p className="text-xs font-bold text-stone-800">¿Asistirás hoy al andén?</p>
                    <p className="text-[11px] text-stone-500">Habilita tu stock en el catálogo del turista</p>
                  </div>
                  <button
                    onClick={() => toggleVendorStock(currentVendor.id)}
                    className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      currentVendor.isAvailable ? 'bg-emerald-600' : 'bg-stone-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        currentVendor.isAvailable ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl text-xs font-medium flex items-center gap-3 ${
                currentVendor.isAvailable ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}>
                {currentVendor.isAvailable ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong>¡Tu stock está PUBLICADO e HABILITADO hoy!</strong> Los pasajeros del Tren Solar pueden ver tus productos y contactarte para retirar en la estación de {currentVendor.station}.
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <strong>Tu stock está OCULTO temporalmente.</strong> Si no puedes acercarte a la estación hoy, mantén este switch apagado para evitar pedidos fallidos.
                    </div>
                  </>
                )}
              </div>

              {/* Formulario para agregar producto */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-4">
                <h3 className="font-bold text-stone-800 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#B85B32]" /> Publicar Nuevo Artículo (Máximo 6 por vendedor)
                </h3>
                
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Nombre del Producto</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Queso de Cabra Criollo" 
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85B32]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Precio ($ ARS)</label>
                    <input 
                      type="number" 
                      placeholder="Ej. 4500" 
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85B32]"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">URL de Foto (opcional)</label>
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      value={newProdImg}
                      onChange={(e) => setNewProdImg(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85B32]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Descripción Breve</label>
                    <input 
                      type="text" 
                      placeholder="Detalles de elaboración, peso o materiales..." 
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B85B32]"
                    />
                  </div>
                  <div className="sm:col-span-2 pt-1">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-[#8C3A27] text-white text-xs font-semibold rounded-lg hover:bg-[#722E1E] transition-colors"
                    >
                      Guardar y Publicar
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de productos actuales del vendedor */}
              <div>
                <h3 className="font-bold text-stone-800 text-sm mb-3">Tus Productos Publicados ({currentVendor.products.length}/6)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentVendor.products.map(p => (
                    <div key={p.id} className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover border" />
                        <div>
                          <p className="font-bold text-xs text-stone-800">{p.name}</p>
                          <p className="text-xs text-emerald-700 font-semibold">${p.price.toLocaleString('es-AR')}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 bg-red-50 rounded-lg border border-red-100"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CRONOGRAMA Y HORARIOS DEL TREN */}
        {activeTab === 'schedules' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#B85B32] uppercase tracking-wider">Horarios Oficiales</span>
              <h2 className="text-2xl font-bold text-stone-900">Cronograma del Tren Solar de la Quebrada</h2>
              <p className="text-xs text-stone-600">
                Extraídos directamente de la programación de recorridos (Ruta A y Ruta B). Los artesanos y agricultores se presentan en el andén unos minutos antes del horario estipulado de llegada.
              </p>
            </div>

            {/* RUTA A */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="bg-[#8C3A27] text-white p-4">
                <h3 className="font-bold text-base">{TRAIN_SCHEDULES.rutaA.title}</h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IDA */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 bg-amber-50 p-2 rounded-lg border border-amber-200/60 inline-block">
                    IDA: Volcán ➔ Tilcara
                  </h4>
                  <div className="space-y-2">
                    {TRAIN_SCHEDULES.rutaA.ida.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                        <span className="font-bold text-stone-800">{s.station}</span>
                        <span className="text-stone-600">
                          {s.llegada !== '-' && `Llegada: ${s.llegada}`} {s.salida !== '-' && `| Salida: ${s.salida}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VUELTA */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 bg-stone-100 p-2 rounded-lg border border-stone-200 inline-block">
                    VUELTA: Tilcara ➔ Volcán
                  </h4>
                  <div className="space-y-2">
                    {TRAIN_SCHEDULES.rutaA.vuelta.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                        <span className="font-bold text-stone-800">{s.station}</span>
                        <span className="text-stone-600">
                          {s.llegada !== '-' && `Llegada: ${s.llegada}`} {s.salida !== '-' && `| Salida: ${s.salida}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RUTA B */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="bg-[#B85B32] text-white p-4">
                <h3 className="font-bold text-base">{TRAIN_SCHEDULES.rutaB.title}</h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IDA */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 bg-amber-50 p-2 rounded-lg border border-amber-200/60 inline-block">
                    IDA: Volcán ➔ Tilcara
                  </h4>
                  <div className="space-y-2">
                    {TRAIN_SCHEDULES.rutaB.ida.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                        <span className="font-bold text-stone-800">{s.station}</span>
                        <span className="text-stone-600">
                          {s.llegada !== '-' && `Llegada: ${s.llegada}`} {s.salida !== '-' && `| Salida: ${s.salida}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VUELTA */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 bg-stone-100 p-2 rounded-lg border border-stone-200 inline-block">
                    VUELTA: Tilcara ➔ Volcán
                  </h4>
                  <div className="space-y-2">
                    {TRAIN_SCHEDULES.rutaB.vuelta.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                        <span className="font-bold text-stone-800">{s.station}</span>
                        <span className="text-stone-600">
                          {s.llegada !== '-' && `Llegada: ${s.llegada}`} {s.salida !== '-' && `| Salida: ${s.salida}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DOCUMENTACIÓN DE ARQUITECTURA / CÓDIGO BACKEND */}
        {activeTab === 'backend' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#B85B32] uppercase tracking-wider">Arquitectura & Backend</span>
              <h2 className="text-2xl font-bold text-stone-900">Código Next.js + Supabase + Vercel</h2>
              <p className="text-xs text-stone-600">
                Estructura completa para la implementación real fullstack de esta propuesta con Supabase DB y API Routes de Next.js.
              </p>
            </div>

            {/* Esquema SQL Supabase */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-sm space-y-3 font-mono text-xs overflow-x-auto">
              <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                <span className="text-amber-400 font-bold">1. Esquema SQL para Supabase (Database Schema)</span>
                <span className="text-stone-500 text-[10px]">supabase_schema.sql</span>
              </div>
              <pre className="text-emerald-400 leading-relaxed">
{`-- Tabla Vendedores
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('Artesano', 'Agricultor')),
  station TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla Productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);`}
              </pre>
            </div>

            {/* API Route Next.js /api/toggle-stock */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-sm space-y-3 font-mono text-xs overflow-x-auto">
              <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                <span className="text-amber-400 font-bold">2. Next.js App Router: API Route `/app/api/toggle-stock/route.ts`</span>
                <span className="text-stone-500 text-[10px]">Next.js 14+</span>
              </div>
              <pre className="text-blue-300 leading-relaxed">
{`import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { vendorId, isAvailable } = await request.json();

    const { data, error } = await supabase
      .from('vendors')
      .update({ is_available: isAvailable })
      .eq('id', vendorId)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, vendor: data[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}`}
              </pre>
            </div>

            {/* API Route Next.js /api/vendors */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-sm space-y-3 font-mono text-xs overflow-x-auto">
              <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                <span className="text-amber-400 font-bold">3. Endpoint Obtener Vendedores Activos `/app/api/vendors/route.ts`</span>
                <span className="text-stone-500 text-[10px]">Next.js GET</span>
              </div>
              <pre className="text-purple-300 leading-relaxed">
{`import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const station = searchParams.get('station');

  let query = supabase
    .from('vendors')
    .select('*, products(*)')
    .eq('is_available', true);

  if (station && station !== 'Todas') {
    query = query.eq('station', station);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ vendors: data });
}`}
              </pre>
            </div>

            {/* Pasos de despliegue en Vercel */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-bold text-stone-800 text-sm flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#B85B32]" /> Guía de Despliegue Express en Vercel
              </h3>
              <ol className="list-decimal list-inside text-xs text-stone-600 space-y-2">
                <li>Crear un nuevo proyecto en Vercel e importar el repositorio de Next.js.</li>
                <li>
                  Configurar las variables de entorno en el panel de Vercel:
                  <ul className="list-disc list-inside pl-4 mt-1 space-y-1 font-mono text-stone-700">
                    <li><code className="bg-stone-100 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                    <li><code className="bg-stone-100 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                    <li><code className="bg-stone-100 px-1 py-0.5 rounded">SUPABASE_SERVICE_ROLE_KEY</code></li>
                  </ul>
                </li>
                <li>Haz clic en <strong>Deploy</strong> y la plataforma estará operativa inmediatamente con Serverless Functions e integración nativa con Supabase.</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* MODAL DE PEDIDO POR WHATSAPP */}
      {selectedProduct && orderVendor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-[#B85B32] uppercase tracking-wider">Confirmar Encargo</span>
                <h3 className="text-lg font-bold text-stone-900">{selectedProduct.name}</h3>
              </div>
              <button 
                onClick={() => { setSelectedProduct(null); setOrderVendor(null); }}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
              <img src={selectedProduct.img} alt="" className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <p className="text-xs text-stone-500">Vendedor: <strong className="text-stone-800">{orderVendor.name}</strong></p>
                <p className="text-xs text-stone-500">Punto de retiro: <strong className="text-[#B85B32]">Estación {orderVendor.station}</strong></p>
                <p className="text-sm font-bold text-emerald-700 mt-0.5">${selectedProduct.price.toLocaleString('es-AR')}</p>
              </div>
            </div>

            {/* Selector de Recorrido de Tren */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">Seleccioná tu recorrido de tren actual:</label>
              <select 
                value={passengerTrainRoute}
                onChange={(e) => setPassengerTrainRoute(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 p-2.5 rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-[#B85B32]"
              >
                <option value="Ruta A - IDA (Volcán ➔ Tilcara)">Ruta A - IDA (Mañana)</option>
                <option value="Ruta A - VUELTA (Tilcara ➔ Volcán)">Ruta A - VUELTA (Tarde)</option>
                <option value="Ruta B - IDA (Volcán ➔ Tilcara)">Ruta B - IDA (Sombra de Mediodía)</option>
                <option value="Ruta B - VUELTA (Tilcara ➔ Volcán)">Ruta B - VUELTA (Noche)</option>
              </select>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Se abrirá WhatsApp con un mensaje prediseñado indicando tu producto y estación de entrega.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => { setSelectedProduct(null); setOrderVendor(null); }}
                className="flex-1 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <a
                href={generateWhatsAppLink(orderVendor, selectedProduct, passengerTrainRoute)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4" /> Enviar Mensaje
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-6 mt-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-semibold text-stone-300">Propuesta de Economía Local para el Tren Solar de la Quebrada</p>
          <p className="text-stone-500">Volcán • Tumbaya • Purmamarca • Hornillos • Maimará • Tilcara</p>
        </div>
      </footer>
    </div>
  );
}
