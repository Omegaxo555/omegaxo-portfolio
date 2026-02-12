"use client"
import { portfolioData } from '@/src/models/PortfolioModel';

export const usePortfolioController = () => {
    // Aquí podríamos añadir lógica de negocio, como manejo de eventos,
    // transiciones de estado o fetching de datos.

    const getHeroData = () => portfolioData.hero;
    const getBlobConfig = () => portfolioData.blobConfig;
    const getParticlesConfig = () => portfolioData.particlesConfig;
    const getPalette = () => portfolioData.palette;
    const getCodeAnimationConfig = () => portfolioData.codeAnimationConfig;

    return {
        hero: getHeroData(),
        blobConfig: getBlobConfig(),
        particlesConfig: getParticlesConfig(),
        palette: getPalette(),
        codeAnimation: getCodeAnimationConfig(),
    };
};
