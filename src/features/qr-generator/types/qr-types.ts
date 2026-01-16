import { z } from 'zod';

export type QRType = 'url' | 'text' | 'phone' | 'email' | 'whatsapp' | 'wifi' | 'location';

export const qrFormSchema = z.object({
    type: z.enum(['url', 'text', 'phone', 'email', 'whatsapp', 'wifi', 'location']).default('url'),
    url: z.string().url().optional().or(z.literal('')),
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
    fgColor: z.string().default('#000000'),
    bgColor: z.string().default('#ffffff'),
    size: z.number().min(128).max(1024).default(512),
    level: z.enum(['L', 'M', 'Q', 'H']).default('L'),
    margin: z.boolean().default(true),
    rounded: z.boolean().default(false),
    logo: z.string().optional(), // base64 logo
});

export type QRFormData = {
    type: QRType;
    url: string;
    text: string;
    phone: string;
    email: {
        address: string;
        subject: string;
        body: string;
    };
    whatsapp: {
        phone: string;
        message: string;
    };
    wifi: {
        ssid: string;
        password: string;
        encryption: 'WPA' | 'WEP' | 'nopass';
        hidden: boolean;
    };
    location: {
        lat: string;
        lng: string;
    };
    fgColor: string;
    bgColor: string;
    size: number;
    level: 'L' | 'M' | 'Q' | 'H';
    margin: boolean;
    rounded: boolean;
    logo?: string;
};

export interface QRHistoryItem extends QRFormData {
    id: string;
    name: string;
    createdAt: number;
}
