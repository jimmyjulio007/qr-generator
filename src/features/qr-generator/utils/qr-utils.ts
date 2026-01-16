import type { QRFormData } from '../types/qr-types';

export const encodeQRData = (data: QRFormData): string => {
    switch (data.type) {
        case 'url':
            return data.url || '';
        case 'text':
            return data.text || '';
        case 'phone':
            return `tel:${data.phone || ''}`;
        case 'email':
            const { address, subject, body } = data.email || {};
            return `mailto:${address || ''}?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(body || '')}`;
        case 'whatsapp':
            const { phone, message } = data.whatsapp || {};
            return `https://wa.me/${phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(message || '')}`;
        case 'wifi':
            const { ssid, password, encryption, hidden } = data.wifi || {};
            return `WIFI:S:${ssid || ''};T:${encryption || 'WPA'};P:${password || ''};H:${hidden ? 'true' : ''};;`;
        case 'location':
            const { lat, lng } = data.location || {};
            return `https://www.google.com/maps/search/?api=1&query=${lat || 0},${lng || 0}`;
        default:
            return '';
    }
};
