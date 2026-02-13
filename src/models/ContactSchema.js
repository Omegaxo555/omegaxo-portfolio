import { z } from 'zod';

export const ContactSchema = z.object({
    email: z.string().email("Correo inválido"),
    subject: z.string().min(5, "El asunto es muy corto"),
    message: z.string().min(10, "Cuéntame un poco más..."),
    // El honeypot debe ser un string vacío
    hp_field: z.string().max(0, { message: "Bot detectado" }).optional()
});