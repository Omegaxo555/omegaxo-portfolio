"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import Blob from '@/src/components/blob'
import ParticlesBackground from '@/src/components/particles-background'
import CodeTypingAnimation from '@/src/components/code-typing-animation'
import { usePortfolioController } from '@/src/controllers/usePortfolioController'

export default function Home() {
    const { hero, blobConfig, particlesConfig, palette, codeAnimation } = usePortfolioController();

    if (!hero) return <div style={{ backgroundColor: '#0c0c0c' }} className="h-screen w-full flex items-center justify-center text-white">Cargando...</div>;

    return (
        <main
            className="h-screen w-full flex flex-col md:flex-row overflow-hidden"
            style={{ backgroundColor: palette.background }}
        >
            {/* Capa de fondo 3D global (Partículas) */}
            <div className="absolute inset-0 z-0 opacity-50">
                <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                    <ParticlesBackground config={particlesConfig} />
                </Canvas>
            </div>

            {/* LADO IZQUIERDO: Información */}
            <section className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center px-12 md:px-24">
                <div className="inline-block px-3 py-1 mb-6 w-fit border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                    <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: palette.primary }}>
                        Available for Projects
                    </span>
                </div>

                <h1
                    className="text-7xl md:text-8xl font-black mb-4 tracking-tighter"
                    style={{ color: palette.text }}
                >
                    {hero.title.split(' ')[0]} <br />
                    <span style={{ color: palette.primary, textShadow: '0 0 30px rgba(0,242,255,0.3)' }}>
                        {hero.title.split(' ')[1]}
                    </span>
                </h1>

                <p
                    className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-8"
                    style={{ color: palette.subtext }}
                >
                    {hero.subtitle}
                </p>

                <div className="flex items-center gap-4 mb-12">
                    <div className="h-[1px] w-12" style={{ background: `linear-gradient(to right, transparent, ${palette.primary})` }}></div>
                    <p
                        className="max-w-md text-sm leading-relaxed tracking-wide font-mono"
                        style={{ color: palette.subtext }}
                    >
                        {hero.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3 rounded-md text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                        style={{ backgroundColor: palette.primary, color: '#000' }}>
                        Ver Proyectos
                    </button>
                    <button className="px-8 py-3 rounded-md text-xs font-bold tracking-widest uppercase border transition-all hover:bg-white/5"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: palette.text }}>
                        Sobre Mí
                    </button>
                </div>
            </section>

            {/* LADO DERECHO: Animación Dinámica */}
            <section className="relative z-10 w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8 bg-black/20">
                {/* El Blob ahora flota detrás de la animación de código en este lado */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} color={palette.primary} />
                        <pointLight position={[-10, -10, 10]} intensity={1} color={palette.secondary} />
                        <Blob config={blobConfig} />
                    </Canvas>
                </div>

                <div className="relative z-10 w-full">
                    <CodeTypingAnimation config={codeAnimation} palette={palette} />
                </div>
            </section>

            {/* Decoración Inferior */}
            <div className="absolute bottom-8 left-12 md:left-24 font-mono text-[9px] opacity-20 uppercase tracking-[0.4em] z-20" style={{ color: palette.text }}>
                PauloRuiz.dev / FullStack Engine / v1.0.4
            </div>
        </main>
    )
}
