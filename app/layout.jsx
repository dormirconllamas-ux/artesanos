import './globals.css'

export const metadata = {
  title: 'Artesanos y Agricultores - Tren Solar de la Quebrada',
  description: 'Catálogo dinámico para pasajeros del Tren Solar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  )
}