"use client";

import { useEffect, useRef, memo, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import type {
    Options,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType
} from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Share2, FileJson, Image as ImageIcon, Sparkles } from "lucide-react";
import type { QRFormData } from "../types/qr-types";
import { encodeQRData } from "../utils/qr-utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface QRPreviewProps {
    data: QRFormData;
}

const QRPreviewComponent = ({ data }: QRPreviewProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<QRCodeStyling | null>(null);
    const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
    const value = encodeQRData(data);

    // Dynamically load QR code library
    useEffect(() => {
        let mounted = true;

        import('qr-code-styling').then((QRCodeStylingModule) => {
            if (mounted) {
                // Store the default export class
                (window as any).QRCodeStyling = QRCodeStylingModule.default;
                setIsLibraryLoaded(true);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    // Initialize and update QR Code
    useEffect(() => {
        if (!containerRef.current || !isLibraryLoaded) return;

        const QRCodeStylingClass = (window as any).QRCodeStyling;
        if (!QRCodeStylingClass) return;

        // Create QR instance if it doesn't exist
        if (!qrCodeRef.current) {
            qrCodeRef.current = new QRCodeStylingClass({
                width: 320,
                height: 320,
                type: 'svg',
                data: value || " ",
                margin: 10,
                qrOptions: {
                    typeNumber: 0,
                    mode: 'Byte',
                    errorCorrectionLevel: 'Q'
                },
                dotsOptions: {
                    type: 'square',
                    color: '#000000'
                },
                backgroundOptions: {
                    color: '#ffffff',
                },
                cornersSquareOptions: {
                    type: 'square',
                    color: '#000000'
                },
                cornersDotOptions: {
                    type: 'square',
                    color: '#000000'
                }
            });

            // Clear container and append
            containerRef.current.innerHTML = '';
            if (qrCodeRef.current) {
                qrCodeRef.current.append(containerRef.current);
            }
        }

        // Update with current data
        const options: Options = {
            data: value || " ",
            width: 320,
            height: 320,
            margin: data.margin ? 12 : 0,
            qrOptions: {
                errorCorrectionLevel: data.level as ErrorCorrectionLevel
            },
            dotsOptions: {
                color: data.fgColor,
                type: data.dotsPattern as DotType,
                gradient: data.gradientType !== 'none' ? {
                    type: data.gradientType as any,
                    rotation: (data.gradientRotation * Math.PI) / 180,
                    colorStops: [
                        { offset: 0, color: data.gradientColor1 },
                        { offset: 1, color: data.gradientColor2 }
                    ]
                } : undefined
            },
            backgroundOptions: {
                color: data.bgColor
            },
            cornersSquareOptions: {
                type: data.eyeStyle as CornerSquareType,
                color: data.eyeColor || data.fgColor
            },
            cornersDotOptions: {
                type: data.eyeStyle === 'square' ? 'square' : 'dot' as CornerDotType,
                color: data.eyeColor || data.fgColor
            },
            ...(data.logo ? {
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 0.4,
                    margin: 8,
                    crossOrigin: "anonymous" as const
                },
                image: data.logo
            } : {})
        };

        if (qrCodeRef.current) {
            qrCodeRef.current.update(options);
        }
    }, [isLibraryLoaded, value, data.fgColor, data.bgColor, data.margin, data.level, data.dotsPattern, data.gradientType, data.gradientColor1, data.gradientColor2, data.gradientRotation, data.eyeStyle, data.eyeColor, data.logo]);

    const download = (ext: 'png' | 'svg') => {
        if (!qrCodeRef.current) return;

        const originalSize = 320;
        qrCodeRef.current.update({ width: data.size, height: data.size });

        qrCodeRef.current.download({
            name: `qr-artifact-${Date.now()}`,
            extension: ext
        }).then(() => {
            qrCodeRef.current?.update({ width: originalSize, height: originalSize });
            toast.success(`Production ${ext.toUpperCase()} Exported`);
        });
    };

    if (!value) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center aspect-square w-full max-w-[360px] mx-auto border-2 border-dashed rounded-[3rem] bg-muted border-border transition-all duration-500"
            >
                <div className="p-6 rounded-3xl bg-background border border-border mb-6 animate-bounce shadow-sm">
                    <Share2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-black italic">Awaiting Input</h3>
                <p className="text-muted-foreground text-sm font-medium px-12 text-center mt-2 leading-relaxed">
                    Enter a URL or text to generate your QR code
                </p>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={`qr-${value}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center space-y-12 w-full"
            >
                <div className="relative w-full max-w-[360px] mx-auto">
                    <div className="p-8 bg-white dark:bg-zinc-950 rounded-[3.5rem] shadow-[0_48px_96px_-24px_rgba(0,0,0,0.2)] border border-border flex items-center justify-center">
                        <div
                            ref={containerRef}
                            className="qr-container w-[320px] h-[320px] flex items-center justify-center rounded-[2rem] overflow-hidden mx-auto"
                            style={{ background: data.bgColor }}
                        />
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border shadow-lg z-10 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Live Render</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 w-full max-w-[360px] mx-auto px-4">
                    <Button
                        variant="outline"
                        onClick={() => download('png')}
                        className="group relative flex flex-col items-center gap-3 h-auto py-8 rounded-[2rem] border-2 border-border bg-background hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative p-3 rounded-2xl bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <span className="relative text-[11px] font-black tracking-[0.2em] uppercase group-hover:text-primary transition-colors duration-300">PNG</span>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => download('svg')}
                        className="group relative flex flex-col items-center gap-3 h-auto py-8 rounded-[2rem] border-2 border-border bg-background hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative p-3 rounded-2xl bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                            <FileJson className="w-6 h-6" />
                        </div>
                        <span className="relative text-[11px] font-black tracking-[0.2em] uppercase group-hover:text-primary transition-colors duration-300">Vector</span>
                    </Button>
                </div>

                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-muted border border-border max-w-[360px] mx-auto">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/80">
                        Vectorized Production Asset
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

// Memoize the component to prevent unnecessary rerenders
// Use JSON comparison for reliable detection of data changes
export const QRPreview = memo(QRPreviewComponent, (prevProps, nextProps) => {
    // Simple deep equality check using JSON.stringify
    // This ensures config restores are properly detected
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

QRPreview.displayName = "QRPreview";
