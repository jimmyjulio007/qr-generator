import { z } from 'zod';

export type QRType = 'url' | 'text' | 'phone' | 'email' | 'whatsapp' | 'wifi' | 'location';

export type DotsPattern = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type EyeStyle = 'square' | 'rounded' | 'extra-rounded';
export type GradientType = 'none' | 'linear' | 'radial';

export const qrFormSchema = z.object({
    type: z.enum(['url', 'text', 'phone', 'email', 'whatsapp', 'wifi', 'location']).default('url'),
    url: z.url().optional().or(z.literal('')),
    text: z.string().optional().default(''),
    phone: z.string().optional().default(''),
    email: z.object({
        address: z.string().email().optional().or(z.literal('')),
        subject: z.string().optional().default(''),
        body: z.string().optional().default(''),
    }).optional().default({ address: '', subject: '', body: '' }),
    whatsapp: z.object({
        phone: z.string().optional().default(''),
        message: z.string().optional().default(''),
    }).optional().default({ phone: '', message: '' }),
    wifi: z.object({
        ssid: z.string().optional().default(''),
        password: z.string().optional().default(''),
        encryption: z.enum(['WPA', 'WEP', 'nopass']).default('WPA'),
        hidden: z.boolean().default(false),
    }).optional().default({ ssid: '', password: '', encryption: 'WPA', hidden: false }),
    location: z.object({
        lat: z.string().optional().default(''),
        lng: z.string().optional().default(''),
    }).optional().default({ lat: '', lng: '' }),
    // Customization
    fgColor: z.string().default('#0f172a'),
    bgColor: z.string().default('#ffffff'),
    size: z.number().min(128).max(1024).default(512),
    level: z.enum(['L', 'M', 'Q', 'H']).default('Q'),
    margin: z.boolean().default(true),
    dotsPattern: z.enum(['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded']).default('square'),
    eyeStyle: z.enum(['square', 'rounded', 'extra-rounded']).default('square'),
    eyeColor: z.string().optional(),
    gradientType: z.enum(['none', 'linear', 'radial']).default('none'),
    gradientColor1: z.string().default('#0f172a'),
    gradientColor2: z.string().default('#3b82f6'),
    gradientRotation: z.number().min(0).max(360).default(0),
    logo: z.string().optional(), // base64 logo
});

export type QRFormData = z.infer<typeof qrFormSchema>;

export interface QRHistoryItem extends QRFormData {
    id: string;
    name: string;
    createdAt: number;
}

