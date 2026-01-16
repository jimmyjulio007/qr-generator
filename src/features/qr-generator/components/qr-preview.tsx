"use client";

import { useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Share2, FileJson, FileText, Image as ImageIcon } from "lucide-react";
import type { QRFormData } from "../types/qr-types";
import { encodeQRData } from "../utils/qr-utils";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface QRPreviewProps {
    data: QRFormData;
}

export function QRPreview({ data }: QRPreviewProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const value = encodeQRData(data);

    const downloadPNG = () => {
        const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
        if (!canvas) return;
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-code-${Date.now()}.png`;
        link.click();
        toast.success("PNG downloaded successfully");
    };

    const downloadSVG = () => {
        const svg = document.getElementById("qr-svg");
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-code-${Date.now()}.svg`;
        link.click();
        toast.success("SVG downloaded successfully");
    };

    const downloadPDF = () => {
        const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
        if (!canvas) return;
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 40, 40, 130, 130);
        pdf.save(`qr-code-${Date.now()}.pdf`);
        toast.success("PDF downloaded successfully");
    };

    if (!value) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-xl bg-muted/30">
                <div className="p-4 rounded-full bg-muted mb-4">
                    <Share2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                    Enter data to generate QR Code
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="p-8 bg-white rounded-2xl shadow-xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="relative">
                    {/* Hidden Canvas for High Res PNG/PDF */}
                    <div className="hidden">
                        <QRCodeCanvas
                            id="qr-canvas"
                            value={value}
                            size={1024} // High resolution for export
                            level={data.level}
                            fgColor={data.fgColor}
                            bgColor={data.bgColor}
                            includeMargin={data.margin}
                            imageSettings={
                                data.logo
                                    ? {
                                        src: data.logo,
                                        height: 200,
                                        width: 200,
                                        excavate: true,
                                    }
                                    : undefined
                            }
                        />
                    </div>

                    <QRCodeSVG
                        id="qr-svg"
                        value={value}
                        size={280}
                        level={data.level}
                        fgColor={data.fgColor}
                        bgColor={data.bgColor}
                        includeMargin={data.margin}
                        imageSettings={
                            data.logo
                                ? {
                                    src: data.logo,
                                    height: 56,
                                    width: 56,
                                    excavate: true,
                                }
                                : undefined
                        }
                        style={{
                            borderRadius: data.rounded ? "12%" : "0%",
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                <Button variant="outline" size="sm" onClick={downloadPNG} className="flex flex-col items-center gap-1 h-auto py-3">
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-bold uppercase">PNG</span>
                </Button>
                <Button variant="outline" size="sm" onClick={downloadSVG} className="flex flex-col items-center gap-1 h-auto py-3">
                    <FileJson className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-bold uppercase">SVG</span>
                </Button>
                <Button variant="outline" size="sm" onClick={downloadPDF} className="flex flex-col items-center gap-1 h-auto py-3">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-bold uppercase">PDF</span>
                </Button>
            </div>
        </div>
    );
}
