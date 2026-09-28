const links = ["Inicio", "Producto", "Nosotros", "Contacto"];

export default function Navbar() {
  return (
    <nav className="pointer-events-auto flex items-center justify-between px-6 py-5 md:px-12">
      <span className="text-lg font-bold tracking-tight">Panda</span>
      <ul className="hidden gap-8 text-sm font-medium text-white/80 md:flex">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition hover:text-white">{l}</a>
          </li>
        ))}
      </ul>
      <button className="rounded-full border border-white/70 px-4 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-[#E3120B]">
        Empezar
      </button>
    </nav>
  );
}
