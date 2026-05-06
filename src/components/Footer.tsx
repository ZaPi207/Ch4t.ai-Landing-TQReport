export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-graphite/5 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-chat.svg"
                alt="Ch4t.ai"
                className="h-8 w-auto"
                style={{ filter: "brightness(0)" }}
              />
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Reporte oficial de resultados operacionales de la prueba piloto de Ch4t.ai en Tierra Querida Marinilla.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Ecosistema</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-primary transition-colors">Asistente IA</a>
              </li>
              <li>
                <a href="#platform" className="hover:text-primary transition-colors">Comandas Automáticas</a>
              </li>
              <li>
                <a href="#platform" className="hover:text-primary transition-colors">Gestión de Delivery</a>
              </li>
              <li>
                <a href="#platform" className="hover:text-primary transition-colors">Cierre de Caja</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Impacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#impact" className="hover:text-primary transition-colors">Tabla de Valor</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-primary transition-colors">Evolución</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Marinilla, Antioquia</li>
              <li>hola@ch4t.ai</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ch4t.ai — Todos los derechos reservados.</p>
          <p>Hecho con 🧡 para Tierra Querida</p>
        </div>
      </div>
    </footer>
  );
}
