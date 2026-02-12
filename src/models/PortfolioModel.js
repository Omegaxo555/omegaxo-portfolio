export const portfolioData = {
    // Paleta de colores: "Cyber-Organic Professional"
    // Transmite tecnología mediante oscuros profundos y acentos cian/neón,
    // y creatividad mediante degradados y contrastes de alta calidad.
    palette: {
        background: "#0c0c0c",    // Negro profundo casi puro (Tech/Premium)
        primary: "#00f2ff",       // Cian eléctrico (Programación/Lógica)
        secondary: "#7000ff",     // Violeta profundo (Creatividad/Disrupción)
        text: "#d6d6d6",          // Blanco puro (Claridad/Profesionalismo)
        subtext: "#a0a0a0",       // Gris neutro para jerarquía visual
        accent: "#ff0055",        // Rosa neón para micro-detalles de impacto
        syntax: {
            comment: "#6a9955",   // Verde comentario
            keyword: "#ff0055",   // Rosa neón (accent)
            string: "#ce9178",    // Naranja suave
            function: "#00f2ff",  // Cian (primary)
            number: "#b5cea8"     // Verde lima suave
        }
    },
    hero: {
        title: "Paulo Ruiz",
        subtitle: "Full Stack & Creative Developer",
        description: "Arquitecturas robustas fundidas con experiencias visuales inmersivas. Transformando lógica compleja en interfaces de vanguardia."
    },
    blobConfig: {
        color: "#7000ff", // Violeta para el foco creativo
        distort: 0.6,
        speed: 2.5,
        roughness: 0,
        metalness: 0.5, // Aspecto metálico/tecnológico
        scale: 2.2
    },
    particlesConfig: {
        count: 8000,
        size: 0.04,
        colors: ["#00f2ff", "#7000ff"], // Cian y Violeta
        radius: 12,
        speed: 0.03
    },
    codeAnimationConfig: {
        snippets: [
            "// Python: Data analysis logic\ndef process_data(samples):\n    return [s for s in samples if s.valid]\n\nresults = process_data(raw_input)",
            "// PHP: Backend Architecture\npublic function store(UserRequest $request) {\n    return User::create($request->validated());\n}",
            "// SQL: High-Performance Queries\nSELECT name, count(*) FROM logs\nWHERE status = 'active'\nGROUP BY 1 ORDER BY 2 DESC;",
            "// Python: AI & Automation\nimport torch\nmodel = NeuralNetwork().to('cuda')\noutput = model(input_tensor)",
            "// PHP: Middleware Pattern\n$next = function($request) {\n    return $auth->check($request);\n};",
            "// SQL: Data Integrity\nALTER TABLE contracts\nADD CONSTRAINT check_valid_date\nCHECK (start_date < end_date);",
            "// TypeScript: Type-Safe Logic\ninterface Dev { skill: string; years: number; }\nconst paulo: Dev = { skill: 'FullStack', years: 5 };",
            "// Python: Scripting\nimport os\n[os.rename(f, f.lower()) for f in os.listdir('.')]",
            "// PHP: API Design\nRoute::get('/v1/sync', function() {\n    return new SyncResource(Collection::all());\n});",
            "// SQL: Analytics View\nCREATE VIEW daily_stats AS\nSELECT date_trunc('day', created_at), sum(revenue)\nFROM transactions GROUP BY 1;",
            "// JavaScript: 3D Math\nconst vector = new THREE.Vector3(x, y, z);\nmesh.position.lerp(vector, 0.1);",
            "// Logic Meets Creativity\nwhile(idea) {\n  validate(idea);\n  build(logic);\n  polish(design);\n}",
            "// Continuous Improvement\ntry {\n  launchProject();\n} catch (error) {\n  debug(error);\n  learnAndRetry();\n}"
        ],
        typingSpeed: 45,
        pauseDuration: 2500
    }
};
