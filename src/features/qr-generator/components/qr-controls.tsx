"use client";

import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, Info } from "lucide-react";
import type { QRFormData } from "../types/qr-types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function QRControls() {
    const { control, watch, setValue } = useFormContext<QRFormData>();

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("logo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <TooltipProvider>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="fgColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Foreground Color</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2">
                                        <Input type="color" className="w-12 h-10 p-1 rounded-md cursor-pointer border-none" {...field} />
                                        <Input type="text" className="flex-1 font-mono text-xs" {...field} />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="bgColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Color</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2">
                                        <Input type="color" className="w-12 h-10 p-1 rounded-md cursor-pointer border-none" {...field} />
                                        <Input type="text" className="flex-1 font-mono text-xs" {...field} />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel className="mb-0">Size ({field.value}px)</FormLabel>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Higher size means better clarity for high-res screens.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <FormControl>
                                <Slider
                                    min={128}
                                    max={1024}
                                    step={32}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <FormLabel className="mb-0">Error Correction</FormLabel>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Higher level allows scanning even if damaged or obscured.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="L">Low (7%)</SelectItem>
                                        <SelectItem value="M">Medium (15%)</SelectItem>
                                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                                        <SelectItem value="H">High (30%)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="rounded"
                        render={({ field }) => (
                            <FormItem className="flex flex-col justify-end">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <FormLabel className="mb-0">Rounded Dots</FormLabel>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Gives the QR code a modern, softer design.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <FormControl>
                                    <div className="flex items-center h-10">
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-1.5">
                        <FormLabel className="mb-0">Logo Overlay</FormLabel>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Upload a PNG/JPG to place in the center of the QR code.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("logo-upload")?.click()}
                            className="w-full h-10 flex items-center justify-center gap-2 border-dashed bg-muted/20 hover:bg-muted/40 transition-colors"
                        >
                            <ImageIcon className="w-4 h-4" />
                            {watch("logo") ? "Change Logo" : "Upload Logo"}
                        </Button>
                        <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                        />
                        {watch("logo") && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setValue("logo", undefined)}
                                className="hover:bg-destructive/10 hover:text-destructive"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    {watch("logo") && (
                        <div className="mt-2 flex items-center gap-3 p-2 rounded-lg border bg-background/50">
                            <div className="w-12 h-12 border rounded-md p-1 bg-white">
                                <img
                                    src={watch("logo")}
                                    alt="Logo preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                Preview active
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
