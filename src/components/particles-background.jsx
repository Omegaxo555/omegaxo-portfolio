"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticlesBackground = ({ config }) => {
    const pointsRef = useRef()

    // Crear una textura con degradado radial para efecto de resplandor
    const glowTexture = useMemo(() => {
        if (typeof document === 'undefined') return null
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)

        return new THREE.CanvasTexture(canvas)
    }, [])

    // Generar posiciones y colores aleatorios para las partículas
    const [particlesPosition, particlesColor] = useMemo(() => {
        const positions = new Float32Array(config.count * 3)
        const colors = new Float32Array(config.count * 3)
        const colorObj = new THREE.Color()
        const palette = config.colors || ["#00f2ff"]

        for (let i = 0; i < config.count; i++) {
            // Posición
            positions[i * 3] = (Math.random() - 0.5) * config.radius * 2
            positions[i * 3 + 1] = (Math.random() - 0.5) * config.radius * 2
            positions[i * 3 + 2] = (Math.random() - 0.5) * config.radius * 2

            // Color aleatorio de la paleta
            const chosenColor = palette[Math.floor(Math.random() * palette.length)]
            colorObj.set(chosenColor)
            colors[i * 3] = colorObj.r
            colors[i * 3 + 1] = colorObj.g
            colors[i * 3 + 2] = colorObj.b
        }
        return [positions, colors]
    }, [config.count, config.radius, config.colors])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * config.speed
            pointsRef.current.rotation.x = time * config.speed * 0.5
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particlesColor.length / 3}
                    array={particlesColor}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={config.size}
                vertexColors
                map={glowTexture}
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    )
}

export default ParticlesBackground
