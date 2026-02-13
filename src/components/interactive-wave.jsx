"use client"
import React, { useRef, useEffect } from 'react'

const InteractiveWave = () => {
    const canvasRef = useRef(null)
    const points = useRef([])
    const mouse = useRef({ x: -1000, y: -1000 })
    const lastScrollY = useRef(0)
    const scrollVelocity = useRef(0)

    const SEGMENTS = 20
    const SPRING_CONSTANT = 0.1
    const DAMPING = 0.9
    const MOUSE_STRENGTH = 5
    const MOUSE_RADIUS = 200

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId

        const initPoints = () => {
            const w = canvas.width
            const h = canvas.height
            points.current = []
            for (let i = 0; i <= SEGMENTS; i++) {
                points.current.push({
                    x: (w / SEGMENTS) * i,
                    y: h * 0.5,
                    targetY: h * 0.5,
                    vy: 0
                })
            }
        }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            initPoints()
        }

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const onScroll = () => {
            const currentScrollY = window.scrollY
            scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current) * 0.2
            lastScrollY.current = currentScrollY

            // Aplicar velocidad de scroll a los puntos aleatoriamente
            points.current.forEach(p => {
                p.vy += (Math.random() - 0.5) * scrollVelocity.current
            })
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('scroll', onScroll)
        resize()

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.beginPath()
            ctx.moveTo(0, canvas.height)
            ctx.lineTo(0, points.current[0].y)

            for (let i = 0; i < points.current.length; i++) {
                const p = points.current[i]

                // Física de resorte
                const dy = p.targetY - p.y
                const force = dy * SPRING_CONSTANT
                p.vy += force
                p.vy *= DAMPING
                p.y += p.vy

                // Interacción con el mouse
                const dist = Math.abs(mouse.current.x - p.x)
                if (dist < MOUSE_RADIUS) {
                    const mouseForce = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH
                    p.vy += mouseForce * (mouse.current.y > p.y ? 1 : -1)
                }

                if (i > 0) {
                    const prevP = points.current[i - 1]
                    const cx = (prevP.x + p.x) / 2
                    const cy = (prevP.y + p.y) / 2
                    ctx.quadraticCurveTo(prevP.x, prevP.y, cx, cy)
                }
            }

            const lastP = points.current[points.current.length - 1]
            ctx.lineTo(lastP.x, lastP.y)
            ctx.lineTo(canvas.width, canvas.height)
            ctx.closePath()

            ctx.fillStyle = '#f1f5f9' // neutral-100 suave
            ctx.fill()

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ touchAction: 'none' }}
        />
    )
}

export default InteractiveWave
