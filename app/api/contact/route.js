import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema } from '@/src/models/ContactSchema';

// Initialize Resend with API key
if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ error: "Falta configurar la API Key de Resend en .env.local" }, { status: 500 });
        }

        const body = await req.json();

        // 1. Validar con Zod (incluye el chequeo del honeypot)
        const result = ContactSchema.safeParse(body);

        if (!result.success) {
            // Si hay un error de validación, devolver los detalles
            return NextResponse.json({ error: "Datos inválidos", details: result.error.format() }, { status: 400 });
        }

        const { email, subject, message, hp_field } = result.data;

        // 2. Honeypot check: si el campo oculto tiene contenido, es un bot.
        // Devolvemos éxito falso para engañar al bot.
        if (hp_field && hp_field.length > 0) {
            return NextResponse.json({ success: true, message: "Spam filtrado" });
        }

        // 3. Enviar el correo si todo está bien
        // IMPORTANTE: 'to' debe ser tu correo verificado en Resend o propio si tienes dominio configurado.
        // Como fallback, usaremos una variable de entorno o un string fijo.
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Usar dominio de prueba de Resend si no tienes uno propio
            to: process.env.CONTACT_EMAIL, // Reemplazar con el email real del usuario
            subject: `📩 Nuevo Contacto: ${subject}`,
            reply_to: email,
            text: `Nuevo mensaje de contacto desde el portafolio.\n\nDe: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2>Nuevo mensaje de contacto</h2>
                    <p><strong>De:</strong> ${email}</p>
                    <p><strong>Asunto:</strong> ${subject}</p>
                    <hr />
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
