# 🛡️ Seguridad Anti-Scraping, Protección de Contacto y GEO — LaPonTech Solutions

Documento técnico que detalla cómo **LaPon Tech Solutions** protege su correo corporativo y su número de WhatsApp/teléfono frente a bots recolectores de spam (*email & phone harvesters*), manteniendo al mismo tiempo la visibilidad semántica para motores de Inteligencia Artificial (**ChatGPT, Gemini, Perplexity, Claude**) y buscadores (**Google, Bing**).

---

## 1. El Problema: Bots Recolectores vs. Motores de IA

1. **Cómo atacan los bots de spam:** Escriben peticiones HTTP simples (`curl`, `python-requests`, `scrapy`) contra el HTML estático de los dominios recién desplegados y ejecutan expresiones regulares buscando el símbolo `@` (`usuario@dominio.com`) o cadenas telefónicas (`+504...`, `wa.me/504...`).
2. **Cómo leen la web los agentes de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`):** A diferencia de `Googlebot`, la mayoría de los rastreadores de IA **no ejecutan JavaScript**, pero **sí poseen comprensión de lenguaje natural** sobre el HTML estático y el archivo `/llms.txt`.

---

## 2. Arquitectura de Protección en Código (Nivel Aplicación)

### A. Protección del Correo Electrónico (`contacto@lapontech.com`)
- **Dónde se aplica:** [`src/components/Footer.astro`](../src/components/Footer.astro), [`src/pages/index.astro`](../src/pages/index.astro), [`src/components/SEO.astro`](../src/components/SEO.astro) y [`public/llms.txt`](../public/llms.txt).
- **Cómo funciona:**
  1. **Cero `@` ni `mailto:` en el HTML estático:** Los enlaces llevan la clase `.js-protected-email` con atributos separados `data-email-user="contacto"` y `data-email-domain="lapontech.com"`.
  2. **Texto semántico para IAs sin JS:** Dentro del HTML base y en `/llms.txt` se escribe `contacto [arroba] lapontech [punto] com`. Los modelos de IA entienden de inmediato que equivale a `contacto@lapontech.com`, pero las expresiones regulares de spam fallan al no existir el carácter `@`.
  3. **Hidratación instantánea en navegador:** Al cargar la página (`DOMContentLoaded`), el script inline en `Footer.astro` une el usuario y el dominio usando `String.fromCharCode(64)` y restaura el texto `contacto@lapontech.com` junto con el `href="mailto:contacto@lapontech.com"` para cualquier visitante humano.
  4. **JSON-LD limpio:** Se omite la propiedad `"email"` en texto plano dentro del bloque `<script type="application/ld+json">`.

### B. Protección del Teléfono y Enlaces de WhatsApp (`wa.me`)
- **Dónde se aplica:** [`src/pages/index.astro`](../src/pages/index.astro) y [`src/components/SEO.astro`](../src/components/SEO.astro).
- **Cómo funciona:**
  1. **Fragmentación en 3 bloques:** El número limpio se divide en el frontmatter de Astro en tres partes (`data-wa-p1="504"`, `data-wa-p2="9900"`, `data-wa-p3="0000"`) dentro de `#contact-form`.
  2. **Cero `wa.me/` estático en el HTML:** Todos los botones de WhatsApp usan `href="#contacto"`, la clase `.js-protected-wa` y el atributo `data-wa-text` con el mensaje preconfigurado de cada sección.
  3. **Hidratación en navegador:** Al ejecutarse `DOMContentLoaded` en un navegador real, el script reconstruye `"https://" + "wa" + ".me/" + (p1 + p2 + p3)` e inyecta el `href` real en todos los botones `.js-protected-wa`.

---

## 3. Comandos de Auditoría Anti-Scraping (Desde Terminal Linux)

Para verificar en cualquier momento (en `dist/index.html` o en producción `https://lapontech.com`) que los bots recolectores devuelven **0 coincidencias** (código de salida `1` en `grep`):

### 1. Probar que NO hay correos expuestos a Regex:
```bash
curl -s https://lapontech.com | grep -E -o "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
```
*(Resultado esperado: vacío / código de salida `1`).*

### 2. Probar que NO hay números de teléfono ni enlaces `wa.me` expuestos a Regex:
```bash
curl -s https://lapontech.com | grep -E -o "(\+?504[- ]?[0-9]{4}[- ]?[0-9]{4}|wa\.me/[0-9]+)"
```
*(Resultado esperado: vacío / código de salida `1`).*

### 3. Probar que las IAs sí leen el correo semántico:
```bash
curl -s https://lapontech.com/llms.txt | grep "contacto \[arroba\] lapontech \[punto\] com"
```
*(Resultado esperado: `- **Correo oficial:** contacto [arroba] lapontech [punto] com`).*

---

## 4. Capa de Red: Configuración en Cloudflare (Proxy + WAF Opcional)

1. **Proxy DNS Activo (Nube Naranja):** Protege la IP de origen y habilita las defensas de borde de Cloudflare.
2. **Security → Bots:** Mantener **Block AI Scrapers and Crawlers** en **`Off`** para permitir que ChatGPT, Gemini, Perplexity y Claude lean el sitio y `/llms.txt`.
3. **Regla WAF Personalizada (Opcional si aumenta el tráfico de bots):**
   - **Ruta:** `Security → WAF → Custom rules → Create rule`
   - **Acción:** `Managed Challenge`
   - **Expresión:**
     ```text
     (not cf.client.bot and not http.user_agent contains "GPTBot" and not http.user_agent contains "OAI-SearchBot" and not http.user_agent contains "ChatGPT-User" and not http.user_agent contains "ClaudeBot" and not http.user_agent contains "Claude-Web" and not http.user_agent contains "anthropic-ai" and not http.user_agent contains "PerplexityBot" and not http.user_agent contains "Perplexity-User" and not http.user_agent contains "Google-Extended" and not http.user_agent contains "Applebot-Extended" and not http.user_agent contains "Meta-ExternalAgent" and not http.user_agent contains "WhatsApp" and not http.user_agent contains "facebookexternalhit") and (http.user_agent contains "python" or http.user_agent contains "curl" or http.user_agent contains "scrapy" or http.user_agent contains "Go-http-client" or http.user_agent contains "Wget" or http.user_agent contains "Apache-HttpClient" or http.user_agent contains "axios" or http.user_agent contains "node-fetch" or http.user_agent contains "AhrefsBot" or http.user_agent contains "SemrushBot" or http.user_agent contains "MJ12bot" or http.user_agent contains "DotBot" or http.user_agent eq "")
     ```
