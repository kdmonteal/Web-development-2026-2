import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Scene from "./components/Scene";

export default function App() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#E3120B] text-white">
      {/* Capa 3D: ocupa toda la pantalla, detrás de la UI */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Capa 2D: no bloquea el mouse, así el tracking funciona en toda la ventana */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
