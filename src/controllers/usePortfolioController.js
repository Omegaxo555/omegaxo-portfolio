"use client"
import { useState, useCallback, useMemo } from 'react';
import { portfolioData } from '../models/PortfolioModel';

/**
 * usePortfolioController
 * 
 * Gestiona el estado global del portafolios, incluyendo el idioma
 * y la lógica de negocio para la vista.
 */
export const usePortfolioController = () => {
    const [language, setLanguage] = useState('es');

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    }, []);

    // Helper para obtener el contenido según el idioma
    const content = useMemo(() => portfolioData[language], [language]);
    const common = portfolioData.common;

    const codeAnimation = useMemo(() => ({
        snippets: common.codeSnippets[language],
        typingSpeed: 45,
        pauseDuration: 2500
    }), [language, common.codeSnippets]);

    return {
        // Estado
        language,
        toggleLanguage,

        // Datos de diseño
        palette: portfolioData.palette,
        blobConfig: common.blobConfig,
        particlesConfig: common.particlesConfig,

        // Contenido traducido
        hero: content.hero,
        about: content.about,
        stack: content.stack,
        projects: content.projects,
        games: content.games,
        contact: {
            ...content.contact,
            ...common.contactInfo
        },

        // Configuraciones de componentes
        codeAnimation,

        // Traducciones directas para UI común si fuera necesario
        t: (key) => content[key] || key
    };
};
