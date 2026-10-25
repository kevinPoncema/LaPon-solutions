# 📘 LaPonTech Solutions — Documento Maestro de Contexto y Guía Estratégica

> **Propósito de este documento:**  
> Servir como manual de referencia unificado sobre el modelo de negocio híbrido (**PYMEs + Marca Blanca para Agencias**), la filosofía de comunicación, la arquitectura **SEO + GEO** y la seguridad **anti-scraping** de **LaPon Tech Solutions** (`lapontech.com`).

---

## 🗂️ Documentación Segmentada en `/docs`

- 🏢 **[docs/01-empresa-y-fundadores.md](./docs/01-empresa-y-fundadores.md)**: Identidad corporativa, cobertura geográfica, mantenimiento opcional y roles de Kevin Ponce y David Flores.
- 🎯 **[docs/02-clientes-objetivo-y-mercado.md](./docs/02-clientes-objetivo-y-mercado.md)**: Segmentación híbrida (Comercios, Medianas Empresas y Agencias en Marca Blanca).
- 🗣️ **[docs/03-guia-de-tono-y-redaccion.md](./docs/03-guia-de-tono-y-redaccion.md)**: Los 6 principios de redacción (cero ataques a agencias, SEO+GEO natural, claridad en DNS/correos externos y orden contextual).
- 📦 **[docs/04-portafolio-de-servicios.md](./docs/04-portafolio-de-servicios.md)**: Fichas oficiales de los 4 servicios para negocios, métricas del Hero y línea de Marca Blanca.
- 🛠️ **[docs/05-arquitectura-tecnica-y-seo.md](./docs/05-arquitectura-tecnica-y-seo.md)**: Stack Astro + Tailwind, Triple Schema JSON-LD, `/llms.txt`, `robots.txt` y CI/CD.
- 🤝 **[docs/06-alianzas-y-marca-blanca-agencias.md](./docs/06-alianzas-y-marca-blanca-agencias.md)**: Modelo comercial B2B para agencias de marketing/diseño y plantilla oficial de contacto.
- 🛡️ **[docs/07-seguridad-anti-scraping-y-geo.md](./docs/07-seguridad-anti-scraping-y-geo.md)**: Protección JS de correo y WhatsApp contra bots de spam + configuración WAF en Cloudflare.
- 📚 **[docs/README.md](./docs/README.md)**: Índice general y mapa de navegación.

---

## 1. 🏢 Identidad de la Empresa y Datos Generales

| Concepto | Detalle Oficial |
| :--- | :--- |
| **Nombre Comercial** | **LaPon Tech Solutions** (o **LaPonTech**) |
| **Dominio Oficial** | [`https://lapontech.com`](https://lapontech.com) |
| **Correo Corporativo** | `contacto@lapontech.com` *(protegido con JS en web y escrito `contacto [arroba] lapontech [punto] com` para IAs)* |
| **Base Operativa** | San Pedro Sula, Cortés, Honduras (CP 21101) |
| **Cobertura Territorial** | • **Presencial:** San Pedro Sula y Valle de Sula (Choloma, Villanueva, El Progreso, Puerto Cortés, La Lima).<br>• **Remota / Nacional:** Tegucigalpa y los 18 departamentos de Honduras por WhatsApp, correo y videollamada. |
| **Modelo Comercial** | Pago por desarrollo con entrega total de código, datos y dominio `.com`. **Mantenimiento, soporte prioritario y hosting administrado 100% opcionales** con tarifas fijas. |

### Fundadores y Roles
- **Kevin D. Ponce** — *Director Técnico & Co-Fundador · Técnico en Informática Orientada a la Programación*  
  Arquitectura de Sistemas, Bases de Datos, Automatizaciones, Despliegue en Servidores, Configuración de DNS/Correos (`SPF, DKIM, DMARC`) y Alianzas de Marca Blanca con Agencias.
- **David Flores Lagos** — *Co-Fundador · Técnico en Informática Orientada a la Programación*  
  Diseño Web Mobile-First optimizado para conversión y SEO/GEO, Atención al Cliente, Capacitación Práctica y Soporte Técnico de Equipos.

---

## 2. 🎯 Enfoque Comercial Híbrido

1. **Comercios y PYMEs (B2C/B2B directo):** Negocios que buscan páginas web rápidas que faciliten aparecer en Google y en IAs (ChatGPT, Gemini, Perplexity), sistemas hechos a la medida de su flujo operativo sin licencias mensuales obligatorias, automatizaciones con WhatsApp y soporte transparente en servidores/equipos.
2. **Agencias de Marketing, Diseño y Publicidad (Modalidad Marca Blanca):** Operamos como su **brazo técnico externo** para resolver desarrollo web/landings con GEO, infraestructura/DNS/correos corporativos y automatizaciones de campañas con WhatsApp/CRM, ofreciendo **tarifas preferenciales para agencias y un descuento introductorio en sus primeros encargos**, respetando siempre al 100% su relación con el cliente final.

---

## 3. 🗣️ Reglas Críticas de Redacción y UX

1. **No criticar a agencias ni consultoras:** En la sección comparativa (`#comparativa`), las columnas se titulan **Nuestro Enfoque en LaPonTech** vs. **El Problema Frecuente**, exponiendo problemas técnicos comunes sin atacar a otros profesionales.
2. **SEO + GEO explicado con naturalidad:** Explicamos que estructuramos las páginas en el formato que leen Google y las inteligencias artificiales (ChatGPT, Gemini, Perplexity), facilitando que comprendan el negocio y haciendo más probable que lo muestren al responder consultas, sin prometer posiciones garantizadas.
3. **DNS y Correos Corporativos sobre Proveedores Externos:** Dejamos claro que enrutamos el dominio y configuramos los sellos de seguridad (`SPF, DKIM, DMARC`) conectándolo con plataformas especializadas externas (Google Workspace, Microsoft 365, Zoho) para garantizar máxima entregabilidad en bandeja principal (sin usar servidores SMTP propios caseros).
4. **Esencia adaptable de los servicios:** Tanto en Sistemas a Medida como en Automatizaciones dejamos explícito que nos adaptamos a lo que el cliente necesite y que los puntos listados son ejemplos reales, no límites cerrados.
5. **Contexto de nombres propios:** Antes de la sección `#nosotros`, nos referimos a *"los ingenieros fundadores que desarrollan tu proyecto"* o *"Dirección Técnica"* para que el visitante no lea los nombres "Kevin y David" sin contexto previo.

---

## 4. 🛡️ Seguridad Anti-Scraping + Visibilidad GEO

- **Cero correos ni números en texto plano en el HTML estático:**
  - Los enlaces de correo (`.js-protected-email`) y de WhatsApp (`.js-protected-wa`) se hidratan automáticamente en el navegador mediante JavaScript (`DOMContentLoaded`).
  - Los bots recolectores de spam por expresiones regulares obtienen **0 coincidencias** tanto de correos como de teléfonos (`+504` / `wa.me`).
- **Visibilidad completa para Agentes de IA:**
  - Archivo [`public/llms.txt`](./public/llms.txt) y [`public/robots.txt`](./public/robots.txt) configurados para `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot` y `Google-Extended`.
  - Esquema triple validado en [`src/components/SEO.astro`](./src/components/SEO.astro) (`ProfessionalService`, `WebSite`, `WebPage` con `SpeakableSpecification`).
