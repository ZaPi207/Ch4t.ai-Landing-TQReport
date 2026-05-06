import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ch4t.ai | Ecosistema Digital para Tierra Querida",
  description:
    "Transformación digital: de un chat de WhatsApp a una máquina de ventas inteligente. Asistente IA 24/7, comandas automáticas, gestión de repartidores y cierre de caja en un solo ecosistema.",
  icons: {
    icon: "/Icono_Blanco.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
