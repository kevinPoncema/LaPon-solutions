// Cloudflare Pages Functions Middleware para Negociación de Contenido con Agentes de IA
// Implementación: "Return HTML responses as markdown when agents request it" (Accept: text/markdown)
// Rendimiento: 0 impacto para usuarios normales (reciben HTML estático compilado en cache).

export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get("accept") || "";
  const url = new URL(request.url);

  // Detectar si el cliente solicita explícitamente Markdown
  const wantsMarkdown =
    accept.includes("text/markdown") ||
    url.searchParams.get("format") === "markdown";

  const isHtmlRoute =
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === "/servicios" ||
    url.pathname === "/servicios/" ||
    url.pathname.endsWith(".html");

  if (wantsMarkdown && isHtmlRoute) {
    try {
      const mdAssetUrl = new URL("/index.md", request.url);
      const mdResponse = await context.env.ASSETS.fetch(mdAssetUrl);
      
      if (mdResponse.ok) {
        const text = await mdResponse.text();
        const tokens = Math.ceil(text.length / 4); // Estimación estándar de tokens

        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "x-markdown-tokens": tokens.toString(),
            "Access-Control-Allow-Origin": "*",
            "Vary": "Accept",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
          }
        });
      }
    } catch (e) {
      // En caso de contingencia, continúa normalmente hacia el HTML
    }
  }

  // Visitantes estándar (navegadores) reciben el HTML estático directamente
  return next();
}
