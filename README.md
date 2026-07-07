# 📅 Feriados Hub

Feriados Hub es una aplicación web moderna, interactiva y minimalista (SaaS-style) diseñada en modo oscuro para visualizar, filtrar y gestionar los feriados nacionales, cívicos y opcionales de diferentes países. Permite a los usuarios planificar sus días libres y puentes con total precisión y anticipación.

¡Olvídate de las listas frías y técnicas! Feriados Hub transforma la información gubernamental en una agenda humana e interactiva.

---

## ✨ Características Principales

- **Diseño UI/UX Premium:** Interfaz limpia en modo oscuro optimizada para una lectura rápida y scannable.
- **Fechas Humanizadas:** Formato amigable que resalta el día de la semana (ej. *Jue, 23 Jul*) para identificar puentes al instante.
- **Badges de Categorización:** Identificación visual por colores del alcance del feriado (Sector Público, Sector Privado, Todo el País, Opcional).
- **Filas Expandibles:** Detalles adicionales del feriado (descripciones y leyes de referencia como Decretos Supremos) ocultos en un acordeón interactivo para no saturar la pantalla.
- **Geolocalización Automática:** Detecta la IP del usuario al entrar para preseleccionar su país por defecto.
- **Arquitectura Limpia:** Frontend modularizado en componentes de React altamente mantenibles y tipados estrictamente con TypeScript.

---

## 🛠️ Stack Tecnológico

**Frontend:**
- React 18
- TypeScript
- Vite (Bundler ultra rápido)
- CSS3 vanilla (Diseño modular y responsive)

**Backend & Base de Datos:**
- Node.js & Express (TypeScript)
- PostgreSQL / MySQL (Estructura relacional de feriados y países)

---

## 🚀 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) y el gestor de paquetes [pnpm](https://pnpm.io/) (o npm/yarn).

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU_USUARIO/feriados-hub-frontend.git](https://github.com/TU_USUARIO/feriados-hub-frontend.git)
cd feriados-hub-frontend
