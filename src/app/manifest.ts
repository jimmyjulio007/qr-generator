import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'NanoBanana QR',
        short_name: 'NanoBanana',
        description: 'Professional grade QR code generator. Powered by NanoBanana.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#FFDD00',
        icons: [
            {
                src: '/icon',
                sizes: 'any',
                type: 'image/png',
            }
        ],
    }
}
