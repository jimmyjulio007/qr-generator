import { useState, useEffect } from 'react';
import type { QRHistoryItem, QRFormData } from '../types/qr-types';

const STORAGE_KEY = 'qr_generator_history';

export function useQRHistory() {
    const [history, setHistory] = useState<QRHistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }
    }, []);

    const saveHistory = (data: QRFormData, name: string) => {
        const newItem: QRHistoryItem = {
            ...data,
            id: crypto.randomUUID(),
            name,
            createdAt: Date.now(),
        };
        const updated = [newItem, ...history];
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteHistory = (id: string) => {
        const updated = history.filter((item) => item.id !== id);
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const updateHistoryName = (id: string, newName: string) => {
        const updated = history.map((item) =>
            item.id === id ? { ...item, name: newName } : item
        );
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return { history, saveHistory, deleteHistory, clearHistory, updateHistoryName };
}
