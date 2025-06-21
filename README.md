# 🕷️ Scraper de publicaciones del blog de Angular

Este proyecto es un **scraper automatizado** desarrollado con [Puppeteer](https://pptr.dev/) que extrae información de los artículos publicados en el sitio [https://blog.angular.dev](https://blog.angular.dev).

El scraper obtiene:
- Título del post
- Subtítulo o descripción
- Nombre y enlace del autor
- Fecha de publicación
- Reacciones: cantidad de "likes" y comentarios

## 📦 Archivos generados

Al ejecutar el scraper, se crean automáticamente los siguientes archivos con los datos extraídos:

- `Resultados.json`: Datos en formato JSON.
- `resultados.csv`: Datos en formato CSV.
- `resultados.xlsx`: Datos en formato Excel (XLSX).

---

## 🚀 Instalación

1. **Clona este repositorio** o guarda el archivo principal del scraper (por ejemplo: `scraper.js`).

2. **Asegúrate de tener Node.js instalado** (versión 14 o superior):
   ```bash
   node -v
