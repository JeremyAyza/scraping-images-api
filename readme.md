<h1 align="center">🖼️ Scrap Images API</h1>
<p align="center">API ultrarrápida basada en <strong>Bun</strong> y <strong>Hono</strong> que permite obtener imágenes en miniatura a partir de una consulta textual, usando scraping sobre DuckDuckGo.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hono-4.7.x-blueviolet?logo=javascript" />
  <img src="https://img.shields.io/badge/Bun-Runtime-green?logo=bun" />
  <img src="https://img.shields.io/badge/OpenAPI-Docs-blue?logo=openapiinitiative" />
  <img src="https://img.shields.io/badge/Scraping-DuckDuckGo-orange?logo=duckduckgo" />
</p>

---

### 📦 Tech Stack

| Tecnología        | Descripción                                       |
| ----------------- | ------------------------------------------------- |
| **Hono**          | Framework ultraligero y moderno basado en Fetch API |
| **Bun**           | Runtime JS moderno y veloz (alternativa a Node.js) |
| **Valibot**       | Validación de inputs tipo-safe para rutas         |
| **OpenAPI + Scalar** | Documentación automática de la API REST        |
| **DuckDuckGo**    | Fuente de imágenes vía scraping HTML + JSON API   |

---

### 📸 Descripción

**Scrap Images API** es una API REST que recibe un texto de búsqueda y devuelve una lista de URLs de miniaturas de imágenes encontradas. Utiliza scraping liviano desde DuckDuckGo (sin Puppeteer, sin headless browser), por lo que es rápida, portable y fácil de desplegar.

> Incluye documentación automática vía `/openapi` y una interfaz web navegable en `/docs`.

---

### ✨ Endpoints

#### `GET /scrap?name=termino`
- Retorna una lista de miniaturas de imágenes relacionadas.
- Valida el parámetro `name` con `valibot`.

#### `POST /scrap/list`
- Recibe un array de strings (términos de búsqueda) y devuelve arrays de URLs por término.

#### `GET /openapi`
- JSON OpenAPI spec (puede ser usado con Swagger UI).

#### `GET /docs`
- Interfaz visual generada con `@scalar/hono-api-reference`.

---

### 🧠 Retos y Aprendizajes

- 🧩 **Arquitectura ultraligera con Hono**: estructura clara, modular y escalable sin sobrecarga de frameworks tradicionales.
- ⚡ **Scraping eficiente sin Puppeteer**: se logró obtener el `vqd` desde el HTML y consumir el endpoint JSON de imágenes de DuckDuckGo directamente.
- 📄 **Documentación OpenAPI completa**: generada desde los controladores con anotaciones y validadores tipados (`valibot`).
- 🧪 **Validación declarativa** con tipado fuerte desde `valibot` + `hono-openapi/valibot`.
- 🚀 **Velocidad con Bun**: la aplicación aprovecha la rapidez de Bun como entorno de ejecución para reducir tiempos de arranque y ejecución.
- 🌐 **Cross-origin listo para producción** con configuración global de CORS.

---

### ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/scraping-service
cd scraping-service

# Instalar dependencias con Bun
bun install

# Iniciar en desarrollo
bun run dev
'''
