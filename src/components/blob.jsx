"use client"
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

const Blob = ({ config }) => {
    const meshRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2
            meshRef.current.rotation.y = time * 0.3
        }
    })

    if (!config) return null;

    return (
        <Sphere ref={meshRef} args={[1, 100, 100]} scale={config.scale || 2.5}>
            <MeshDistortMaterial
                color={config.color || "#6ce99a"}
                attach="material"
                distort={config.distort ?? 0.5}
                speed={config.speed ?? 4}
                roughness={config.roughness ?? 0.1}
                metalness={config.metalness ?? 0.25}
            />
        </Sphere>
    )
}

export default Blob