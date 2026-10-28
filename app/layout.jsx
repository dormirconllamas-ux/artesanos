import './globals.css';

export const metadata = {
  title: 'Tren Solar - Mercado en Estación',
  description: 'Conectando artesanos y agricultores con pasajeros',
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
