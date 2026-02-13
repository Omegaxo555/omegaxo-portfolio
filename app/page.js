"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import Blob from '@/src/components/blob'
import ParticlesBackground from '@/src/components/particles-background'
import CodeTypingAnimation from '@/src/components/code-typing-animation'
import InteractiveWave from '@/src/components/interactive-wave'
import ProjectParticles from '@/src/components/project-particles'
import { usePortfolioController } from '@/src/controllers/usePortfolioController'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema } from '@/src/models/ContactSchema';
import { useState } from 'react';

export default function Home() {
    const { hero, blobConfig, particlesConfig, palette, codeAnimation, about, stack, projects, games, contact, language, toggleLanguage } = usePortfolioController();

    if (!hero) return <div style={{ backgroundColor: '#0c0c0c' }} className="h-screen w-full flex items-center justify-center text-white">Loading...</div>;

    return (
        <main
            className="min-h-screen w-full selection:bg-cyan-500 selection:text-white"
            style={{ backgroundColor: palette.background }}
        >
            {/* HERO SECTION */}
            <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row relative overflow-hidden">
                {/* Capa de fondo 3D global (Partículas) */}
                <div className="absolute inset-0 z-0 opacity-50">
                    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                        <ParticlesBackground config={particlesConfig} />
                    </Canvas>
                </div>

                {/* LADO IZQUIERDO: Información */}
                <section className="relative z-10 w-full md:w-1/2 min-h-[60vh] md:h-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-20 md:py-0">
                    <div className="absolute top-8 right-8 z-50">
                        <button
                            onClick={toggleLanguage}
                            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all text-white"
                        >
                            {language === 'es' ? 'EN / ES' : 'ES / EN'}
                        </button>
                    </div>

                    <div className="inline-block px-3 py-1 mb-6 w-fit border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: palette.primary }}>
                            {hero.badge}
                        </span>
                    </div>

                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tighter leading-none"
                        style={{ color: palette.text }}
                    >
                        {hero.title.split(' ')[0]} <br />
                        <span style={{ color: palette.primary, textShadow: '0 0 30px rgba(0,242,255,0.3)' }}>
                            {hero.title.split(' ')[1]}
                        </span>
                    </h1>

                    <p
                        className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-8"
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
                        <button className="flex-1 sm:flex-none px-8 py-4 md:py-3 rounded-md text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                            style={{ backgroundColor: palette.primary, color: '#000' }} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            {hero.ctaPrimary}
                        </button>
                        <button className="flex-1 sm:flex-none px-8 py-4 md:py-3 rounded-md text-[10px] md:text-xs font-bold tracking-widest uppercase border transition-all hover:bg-white/5"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', color: palette.text }} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                            {hero.ctaSecondary}
                        </button>
                    </div>
                </section>

                {/* LADO DERECHO: Animación Dinámica */}
                <section className="relative z-10 w-full md:w-1/2 min-h-[40vh] md:h-full flex flex-col items-center justify-center p-6 sm:p-8 bg-black/20">
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
            </div>

            {/* ABOUT SECTION */}
            <AboutSection about={about} palette={palette} language={language} />

            {/* STACK SECTION */}
            <StackSection stack={stack} palette={palette} language={language} />

            {/* PROJECTS SECTION */}
            <ProjectsSection projects={projects} palette={palette} language={language} />

            {/* GAMES SECTION */}
            <GamesSection games={games} language={language} />

            {/* CONTACT SECTION */}
            <ContactSection contact={contact} language={language} />

            {/* Decoración Inferior */}
            <Footer palette={palette} />
        </main>
    )
}

export function Footer({ palette }) {

    return (
        <footer className="py-12 px-12 md:px-24 font-mono text-[9px] opacity-20 uppercase tracking-[0.4em] z-20 text-center md:text-left" style={{ color: palette.text }}>
            omegaxo.dev / Next.js 16 / v1.0.4
        </footer>
    )
}

function AboutSection({ about, palette, language }) {

    if (!about) return null;

    return (
        <section id="about" className="relative min-h-screen bg-white text-black py-20 md:py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
            {/* Elementos Decorativos de Vanguardia */}
            <div className="absolute top-0 right-[-10%] w-[300px] md:w-[500px] h-full bg-neutral-100/80 -skew-x-12 z-0 animate-safe-slide" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <span className="text-xs font-bold tracking-[0.5em] text-neutral-400 uppercase">
                            01 / {language === 'es' ? 'Manifiesto' : 'Manifest'}
                        </span>
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-[0.85]">
                            {about.title}
                        </h2>
                    </div>

                    <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-lg leading-tight text-neutral-800">
                        {about.description}
                    </p>

                    <div className="relative pt-12 max-w-sm">
                        {/* Línea Superior */}
                        <div className="absolute top-0 left-0 w-24 h-[1px] bg-black/10" />

                        <p className="text-sm font-mono italic text-neutral-500 leading-relaxed">
                            "{about.manifesto}"
                        </p>

                        {/* Línea Inferior - Con padding para evitar saltos */}
                        <div className="pt-8">
                            <div className="w-32 h-[2px] bg-black/30" />
                        </div>
                    </div>
                </div>

                <div className="space-y-16 md:pt-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {about.details.map((detail, index) => (
                            <div key={index} className="group border-b border-black/10 pb-6 transition-colors hover:border-black">
                                <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase mb-2">
                                    {detail.label}
                                </p>
                                <p className="text-xl md:text-2xl font-bold tracking-tight">
                                    {detail.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative p-8 bg-neutral-900 text-white rounded-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-4 tracking-tight">{about.techTitle}</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed font-mono">
                            React / Next.js / Three.js / Python / Node / PHP / SQL / AI Integration
                        </p>
                        <button className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })}>
                            <span>{about.techCta}</span>
                            <div className="w-4 h-[1px] bg-white/30" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Firma o Marca de Agua Lateral */}
            <div className="absolute right-[10%] bottom-[-15%] z-0 rotate-90 origin-right pointer-events-none animate-safe-float">
                <span className="text-[100px] md:text-[180px] font-black text-black/[0.04] select-none tracking-tighter uppercase whitespace-nowrap block">
                    {about.watermark}
                </span>
            </div>
        </section>
    )
}

function StackSection({ stack, palette, language }) {

    if (!stack) return null;

    return (
        <section id="stack" className="relative min-h-screen bg-white text-black py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[20vh] z-0 rotate-180">
                <InteractiveWave />
            </div>
            {/* Franja de Líquido 2D Interactiva en la parte inferior */}
            <div className="absolute bottom-0 left-0 w-full h-[75vh] z-0">
                <InteractiveWave />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="mb-20">
                    <span className="text-xs font-bold tracking-[0.5em] text-neutral-400 uppercase mb-4 block">
                        02 / {language === 'es' ? 'Capacidades' : 'Capabilities'}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black">
                        {stack.title}
                    </h2>
                    <p className="text-neutral-500 max-w-xl text-lg md:text-xl font-mono">
                        {stack.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
                    {stack.categories.map((category, index) => (
                        <div key={index} className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-neutral-200" />
                                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-400">
                                    {category.name}
                                </h3>
                            </div>

                            <div className="space-y-12">
                                {category.skills.map((skill, sIndex) => (
                                    <div key={sIndex} className="relative group/skill">
                                        <h4 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight transition-transform duration-300 group-hover/skill:translate-x-3 text-black">
                                            {skill.name}
                                        </h4>
                                        <div className="flex items-start gap-3 opacity-60 transition-opacity group-hover/skill:opacity-100">
                                            <span className="text-[10px] font-mono text-black pt-1 font-bold">{stack.labelUsage}</span>
                                            <p className="text-sm text-neutral-600 font-mono leading-relaxed">
                                                {skill.usage}
                                            </p>
                                        </div>
                                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-0 bg-neutral-900 transition-all duration-300 group-hover/skill:h-full opacity-0 group-hover/skill:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marca de Agua Lateral */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none opacity-[0.03]">
                <span className="text-[120px] md:text-[200px] font-black text-black uppercase whitespace-nowrap">
                    {stack.watermark}
                </span>
            </div>
        </section>
    )
}

function ProjectsSection({ projects, palette, language }) {

    if (!projects) return null;

    return (
        <section id="projects" className="relative min-h-screen bg-[#080808] text-white py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
            {/* Fondo Inmersivo de Partículas Reactivas */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                    <ProjectParticles />
                </Canvas>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-4">
                    <span className="text-xs font-bold tracking-[0.8em] text-cyan-400 uppercase mb-4 block animate-pulse">
                        {projects.badge}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
                        {projects.title}
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
                        {projects.subtitle}
                    </p>
                </div>

                <div className="text-center mb-12">
                    <a href={projects.url}
                        className="flex-1 sm:flex-none px-8 py-4 md:py-3 rounded-md text-[10px] md:text-xs font-bold tracking-widest uppercase border transition-all hover:bg-white/5"
                    >
                        {projects.urlText}
                    </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {projects.list.map((project, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08] hover:border-cyan-500/50 hover:-translate-y-4 overflow-hidden"
                            style={{ boxShadow: `0 20px 40px -20px ${project.color}33` }}
                        >
                            {/* Glow Effect */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 blur-[100px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{ backgroundColor: project.color }} />

                            <div className="relative z-10">
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block" style={{ color: project.color }}>
                                    {project.category}
                                </span>
                                <h3 className="text-3xl font-bold mb-6 tracking-tight group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-neutral-400 leading-relaxed mb-8 min-h-[80px]">
                                    {project.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tIndex) => (
                                            <span key={tIndex} className="text-[9px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300 ml-4 shrink-0"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Decorativa: Número de proyecto */}
                            <div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.05] transition-colors">
                                0{project.id}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="px-10 py-4 rounded-full bg-white text-black text-xs font-bold tracking-widest uppercase hover:scale-110 transition-transform active:scale-95 shadow-xl shadow-cyan-500/10">
                        {projects.cta}
                    </button>
                </div>
            </div >
        </section >
    )
}

function GamesSection({ games, language }) {

    if (!games) return null;

    return (
        <section id="games" className="relative min-h-screen bg-[#050505] py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden crt-screen retro-grid">
            <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none crt-flicker"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-[10px] font-mono text-cyan-400 tracking-[0.4em] uppercase mb-4 block border-l-4 border-cyan-400 pl-4">
                            {games.badge}
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
                            {games.title}
                        </h2>
                    </div>
                    <p className="text-neutral-500 font-mono text-sm max-w-md bg-black/50 p-4 border border-white/5 backdrop-blur-sm">
                        [MSG]: {games.subtitle} _
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {games.list.map((game, index) => (
                        <div key={index} className="group relative bg-[#0a0a0a] border-2 border-white/10 p-1 transition-all hover:border-cyan-400/50 hover:-translate-y-2">
                            {/* Imagen del Juego o Placeholder */}
                            <div className="relative w-full aspect-video bg-[#1a1a1a] overflow-hidden group-hover:bg-[#222]">
                                {game.image ? (
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 border-2 border-cyan-400 rounded-lg animate-spin" style={{ animationDuration: '4s' }}></div>
                                    </div>
                                )}

                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-[9px] font-mono text-cyan-400 border border-cyan-400/30 z-10">
                                    0{game.id}
                                </div>
                                <div className="absolute bottom-2 right-2 text-[10px] font-mono font-bold text-white/80 uppercase bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10 z-10">
                                    {game.genre}
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                    {game.title}
                                </h3>

                                <p className="text-xs text-neutral-500 font-mono leading-relaxed h-[60px] overflow-hidden">
                                    {game.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="text-[9px] font-mono uppercase text-neutral-400">
                                        <span className="text-cyan-400">DEV:</span> {game.tech}
                                    </div>
                                    <div className="text-xs font-black text-cyan-400 italic">
                                        {game.score}
                                    </div>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ))}
                </div>

                {/* Footer de la sección */}
                <div className="mt-20 flex items-center justify-center gap-8 border-y border-white/5 py-8 opacity-30 group">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">{games.footer.console}</span>
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">{games.footer.memory}</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white cursor-pointer hover:text-cyan-400">{games.footer.start}</div>
                </div>
            </div>

            {/* Retro Watermark */}
            <div className="absolute bottom-12 right-12 opacity-[0.02] pointer-events-none select-none">
                <span className="text-[150px] font-black uppercase italic italic-shining">{games.watermark}</span>
            </div>
        </section>
    )
}

function ContactSection({ contact, language }) {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            email: "",
            subject: "",
            message: "",
            hp_field: "" // Honeypot vacío por defecto
        }
    });

    const onSubmit = async (data) => {
        setStatus('loading');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en el envío');
            }

            setStatus('success');
            reset();
            // Clear success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (!contact) return null;

    return (
        <section id="contact" className="relative min-h-screen bg-white text-black py-24 px-6 sm:px-12 md:px-24 flex flex-col justify-center overflow-hidden">
            {/* Elementos Orgánicos de Fondo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-100 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Columna Izquierda: Mensaje y Confianza */}
                    <div className="space-y-12">
                        <div>
                            <span className="text-xs font-bold tracking-[0.5em] text-cyan-600 uppercase mb-4 block">
                                {contact.badge}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                                {contact.title}
                            </h2>
                            <p className="text-neutral-500 text-xl font-light leading-relaxed max-w-md">
                                {contact.subtitle}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-xl transition-all group-hover:scale-110 group-hover:bg-cyan-50 group-hover:border-cyan-200">
                                    ✉️
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{contact.emailLabel}</p>
                                    <p className="text-lg font-mono font-bold hover:text-cyan-600 cursor-pointer transition-colors">{contact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-xl transition-all group-hover:scale-110 group-hover:bg-purple-50 group-hover:border-purple-200">
                                    📍
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{contact.availabilityLabel}</p>
                                    <p className="text-lg font-bold">{contact.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {contact.socials.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white hover:border-black transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario Elegante */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-neutral-100/50 blur-3xl rounded-3xl -z-10 transform rotate-3" />
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-12 rounded-[40px] border border-neutral-100 shadow-2xl shadow-neutral-200/50 space-y-8">

                            {/* Honeypot field - Hidden from users */}
                            <input type="text" {...register("hp_field")} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">{contact.subjectLabel}</label>
                                    <input
                                        type="text"
                                        placeholder={contact.namePlaceholder || "Hola..."}
                                        className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border ${errors.subject ? 'border-red-300 bg-red-50' : 'border-neutral-100'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium`}
                                        {...register("subject")}
                                    />
                                    {errors.subject && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.subject.message}</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">{contact.emailFormLabel}</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-100'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium`}
                                        {...register("email")}
                                    />
                                    {errors.email && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">{contact.msgLabel}</label>
                                <textarea
                                    rows="4"
                                    placeholder={contact.msgPlaceholder}
                                    className={`w-full px-6 py-4 rounded-2xl bg-neutral-50 border ${errors.message ? 'border-red-300 bg-red-50' : 'border-neutral-100'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium resize-none`}
                                    {...register("message")}
                                />
                                {errors.message && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.message.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-5 rounded-2xl bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>{contact.sendingMsg}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{contact.cta}</span>
                                        <span className="text-lg">→</span>
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <p className="text-center text-[10px] text-green-500 font-bold animate-pulse">
                                    {contact.successMsg}
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-center text-[10px] text-red-500 font-bold">
                                    {contact.errorMsg}
                                </p>
                            )}
                            {status === 'idle' && (
                                <p className="text-center text-[10px] text-neutral-400 font-medium">
                                    {contact.successMsg}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Firma o Marca de Agua Soft */}
            <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 rotate-90 origin-center pointer-events-none opacity-[0.02] select-none">
                <span className="text-[180px] font-black uppercase text-black leading-none whitespace-nowrap">
                    {contact.watermark}
                </span>
            </div>
        </section>
    )
}
