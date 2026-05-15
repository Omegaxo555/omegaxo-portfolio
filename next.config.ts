import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Reemplaza 'nombre-del-repositorio' por el nombre exacto en GitHub
  basePath: process.env.NODE_ENV === "production" ? "/omegaxo-portfolio" : "",
  images: {
    unoptimized: true, // GitHub Pages no soporta la optimización de imágenes nativa de Next.js
  },
};

export default nextConfig;





