import { Canvas } from '@react-three/fiber'
import Blob from './components/Blob'

export default function Home() {
    return (
        <main className="h-screen w-full bg-black flex items-center justify-center">
            {/* El Canvas es el contenedor 3D */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 5, 2]} />
                    <Blob />
                </Canvas>
            </div>

            {/* Tu contenido de Storytelling encima del 3D */}
            <div className="relative z-10 text-center">
                <h1 className="text-6xl font-bold text-white">Lógica Pura.</h1>
                <p className="text-xl text-gray-400 mt-4">Arquitecturas robustas, interfaces disruptivas.</p>
            </div>
        </main>
    )
}