"use client"
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const ProjectParticles = () => {
    const pointsRef = useRef()
    const { viewport } = useThree()

    // Configuración de las partículas
    const count = 3000
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 40
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return pos
    }, [])

    const mouse = useRef({ x: 0, y: 0 })
    const scrollY = useRef(0)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Suavizar el seguimiento del scroll
        scrollY.current += (window.scrollY - scrollY.current) * 0.05

        if (pointsRef.current) {
            // Rotación base
            pointsRef.current.rotation.y = time * 0.05
            pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1

            // Movimiento vertical basado en scroll
            pointsRef.current.position.y = (scrollY.current * 0.005) % 20 - 10
        }

        // Efecto de distorsión sutil en las posiciones (opcional si usamos shader, pero aquí lo haremos simple)
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.09}
                color="#6f00ff"
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default ProjectParticles
