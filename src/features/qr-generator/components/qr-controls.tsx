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
import { ImageIcon, X, Info, Palette, Grid3X3, Eye, Zap, Type as TypeIcon } from "lucide-react";
import type { QRFormData, DotsPattern, EyeStyle, GradientType } from "../types/qr-types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback } from "react";

const QRControlsComponent = () => {
    const { control, watch, setValue } = useFormContext<QRFormData>();
    const gradientType = watch("gradientType");

    const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("logo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [setValue]);

    const Label = ({ children, tooltip }: { children: React.ReactNode, tooltip?: string }) => (
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">{children}</span>
            {tooltip && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-card border-border shadow-2xl">
                        <p className="text-xs font-medium">{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );

    return (
        <TooltipProvider>
            <div className="space-y-10">
                <Tabs defaultValue="style" className="w-full">
                    <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-muted via-muted/90 to-muted/70 border-2 border-border rounded-xl sm:rounded-2xl mb-8 sm:mb-10 shadow-inner overflow-hidden">
                        <TabsList className="flex h-auto gap-1 sm:gap-1.5 bg-transparent p-0 relative">
                            <TabsTrigger
                                value="style"
                                className="group relative flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] py-2 sm:py-3 px-1 sm:px-2 rounded-lg sm:rounded-xl transition-all duration-500 data-[state=inactive]:text-muted-foreground hover:text-foreground"
                            >
                                {/* Active background with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-background to-background/90 rounded-lg sm:rounded-xl shadow-2xl opacity-0 scale-95 group-data-[state=active]:opacity-100 group-data-[state=active]:scale-100 transition-all duration-500" />

                                {/* Active border */}
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-data-[state=active]:border-primary/10 transition-all duration-500" />

                                {/* Icon with rotation */}
                                <Palette className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 group-data-[state=active]:text-primary group-data-[state=active]:scale-110 group-data-[state=active]:-rotate-12" />

                                {/* Label */}
                                <span className="relative z-10 leading-none">Chroma</span>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </TabsTrigger>

                            <TabsTrigger
                                value="pattern"
                                className="group relative flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] py-2 sm:py-3 px-1 sm:px-2 rounded-lg sm:rounded-xl transition-all duration-500 data-[state=inactive]:text-muted-foreground hover:text-foreground"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-background to-background/90 rounded-lg sm:rounded-xl shadow-2xl opacity-0 scale-95 group-data-[state=active]:opacity-100 group-data-[state=active]:scale-100 transition-all duration-500" />
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-data-[state=active]:border-primary/10 transition-all duration-500" />
                                <Grid3X3 className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 group-data-[state=active]:text-primary group-data-[state=active]:scale-110 group-data-[state=active]:rotate-90" />
                                <span className="relative z-10 leading-none">Geometry</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </TabsTrigger>

                            <TabsTrigger
                                value="advanced"
                                className="group relative flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2 font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] py-2 sm:py-3 px-1 sm:px-2 rounded-lg sm:rounded-xl transition-all duration-500 data-[state=inactive]:text-muted-foreground hover:text-foreground"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-background to-background/90 rounded-lg sm:rounded-xl shadow-2xl opacity-0 scale-95 group-data-[state=active]:opacity-100 group-data-[state=active]:scale-100 transition-all duration-500" />
                                <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-data-[state=active]:border-primary/10 transition-all duration-500" />
                                <Zap className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 group-data-[state=active]:text-primary group-data-[state=active]:scale-110" />
                                <span className="relative z-10 leading-none">Engineering</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="style" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="space-y-6">
                            <FormField
                                control={control}
                                name="gradientType"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Color Fill Strategy</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 rounded-xl bg-background border-border font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-xl border-border bg-card">
                                                <SelectItem value="none">Monochromatic</SelectItem>
                                                <SelectItem value="linear">Linear Evolution</SelectItem>
                                                <SelectItem value="radial">Radial Expansion</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <AnimatePresence mode="wait">
                                {gradientType === "none" ? (
                                    <motion.div
                                        key="solid"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="grid grid-cols-2 gap-6"
                                    >
                                        <FormField
                                            control={control}
                                            name="fgColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label>Primary Tint</Label>
                                                    <div className="flex gap-3">
                                                        <label className="sr-only" htmlFor="fg-color-picker">Primary color picker</label>
                                                        <Input id="fg-color-picker" type="color" {...field} className="w-12 h-12 p-1 rounded-xl cursor-pointer border-border bg-background" aria-label="Primary tint color picker" />
                                                        <Input {...field} placeholder="#000000" className="flex-1 h-12 rounded-xl border-border bg-background font-mono font-bold" aria-label="Primary tint hex value" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name="bgColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label>Canvas Base</Label>
                                                    <div className="flex gap-3">
                                                        <label className="sr-only" htmlFor="bg-color-picker">Background color picker</label>
                                                        <Input id="bg-color-picker" type="color" {...field} className="w-12 h-12 p-1 rounded-xl cursor-pointer border-border bg-background" aria-label="Canvas base color picker" />
                                                        <Input {...field} placeholder="#ffffff" className="flex-1 h-12 rounded-xl border-border bg-background font-mono font-bold" aria-label="Canvas base hex value" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="gradient"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-2 gap-6">
                                            <FormField
                                                control={control}
                                                name="gradientColor1"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Label>Origin Color</Label>
                                                        <div className="flex gap-3">
                                                            <label className="sr-only" htmlFor="gradient-color1-picker">Gradient origin color picker</label>
                                                            <Input id="gradient-color1-picker" type="color" {...field} className="w-12 h-12 p-1 rounded-xl cursor-pointer border-border bg-background" aria-label="Gradient origin color picker" />
                                                            <Input {...field} className="flex-1 h-12 rounded-xl border-border bg-background font-mono font-bold" aria-label="Gradient origin hex value" />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={control}
                                                name="gradientColor2"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Label>Target Color</Label>
                                                        <div className="flex gap-3">
                                                            <label className="sr-only" htmlFor="gradient-color2-picker">Gradient target color picker</label>
                                                            <Input id="gradient-color2-picker" type="color" {...field} className="w-12 h-12 p-1 rounded-xl cursor-pointer border-border bg-background" aria-label="Gradient target color picker" />
                                                            <Input {...field} className="flex-1 h-12 rounded-xl border-border bg-background font-mono font-bold" aria-label="Gradient target hex value" />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        {gradientType === "linear" && (
                                            <FormField
                                                control={control}
                                                name="gradientRotation"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="flex justify-between items-center mb-4">
                                                            <Label>Rotation Axis</Label>
                                                            <span className="text-[11px] font-black tabular-nums">{field.value}°</span>
                                                        </div>
                                                        <Slider
                                                            min={0}
                                                            max={360}
                                                            step={1}
                                                            value={[field.value]}
                                                            onValueChange={(v) => field.onChange(v[0])}
                                                            className="py-4"
                                                        />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </TabsContent>

                    <TabsContent value="pattern" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={control}
                                name="dotsPattern"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label tooltip="Defines the geometric shape of individual data modules.">Module Geometry</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 rounded-xl bg-background border-border font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-xl border-border bg-card">
                                                <SelectItem value="square">Standard Square</SelectItem>
                                                <SelectItem value="dots">Circular Dot</SelectItem>
                                                <SelectItem value="rounded">Soft Rounded</SelectItem>
                                                <SelectItem value="extra-rounded">Deep Rounded</SelectItem>
                                                <SelectItem value="classy">Refined Classy</SelectItem>
                                                <SelectItem value="classy-rounded">Organic Classy</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="eyeStyle"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label tooltip="Defines the shape of the three large corner alignment patterns.">Eye Morphology</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 rounded-xl bg-background border-border font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-xl border-border bg-card">
                                                <SelectItem value="square">Rigid Square</SelectItem>
                                                <SelectItem value="rounded">Soft Contour</SelectItem>
                                                <SelectItem value="extra-rounded">High Radius</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-6 pt-6 border-t border-border">
                            <div className="flex items-center justify-between">
                                <Label tooltip="Apply a distinct color to the eye patterns for better brand alignment.">Custom Eye Tint</Label>
                                <Switch
                                    checked={!!watch("eyeColor")}
                                    onCheckedChange={(checked) => setValue("eyeColor", checked ? watch("fgColor") : undefined)}
                                    aria-label="Toggle custom eye tint"
                                />
                            </div>

                            <AnimatePresence>
                                {watch("eyeColor") !== undefined && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <FormField
                                            control={control}
                                            name="eyeColor"
                                            render={({ field }) => (
                                                <FormItem className="pt-2">
                                                    <div className="flex gap-3">
                                                        <label className="sr-only" htmlFor="eye-color-picker">Eye tint color picker</label>
                                                        <Input id="eye-color-picker" type="color" {...field} className="w-12 h-12 p-1 rounded-xl cursor-pointer border-border bg-background" aria-label="Eye tint color picker" />
                                                        <Input {...field} placeholder="#000000" className="flex-1 h-12 rounded-xl border-border bg-background font-mono font-bold" aria-label="Eye tint hex value" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label tooltip="Ability to survive damage/obstruction. High allows for larger logos.">Error Tolerance</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 rounded-xl bg-background border-border font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-xl border-border bg-card">
                                                <SelectItem value="L">Level L (7% Recovery)</SelectItem>
                                                <SelectItem value="M">Level M (15% Recovery)</SelectItem>
                                                <SelectItem value="Q">Level Q (25% Recovery)</SelectItem>
                                                <SelectItem value="H">Level H (30% Recovery)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="margin"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Label tooltip="Adds a safety whitespace buffer around the code.">Safety Margin</Label>
                                        <div className="flex items-center h-12 px-4 rounded-xl border border-border bg-background">
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <span className="ml-3 text-xs font-bold">{field.value ? "Active" : "Disabled"}</span>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center mb-4">
                                        <Label tooltip="Final pixel dimensions for the export artifact.">Output Resolution</Label>
                                        <span className="text-[11px] font-black tabular-nums">{field.value} x {field.value} PX</span>
                                    </div>
                                    <Slider
                                        min={128}
                                        max={2048}
                                        step={128}
                                        value={[field.value]}
                                        onValueChange={(v) => field.onChange(v[0])}
                                        className="py-4"
                                    />
                                </FormItem>
                            )}
                        />

                        <div className="pt-8 border-t border-border">
                            <Label tooltip="Embed a brand mark in the center of the geometric pattern.">Brand Overlay</Label>
                            <div className="mt-6 flex flex-col gap-4">
                                {!watch("logo") ? (
                                    <div className="relative h-40 w-full rounded-3xl border-2 border-dashed border-border flex items-center justify-center hover:bg-muted/50 hover:border-primary transition-all duration-500 group overflow-hidden bg-gradient-to-br from-muted/20 to-transparent">
                                        {/* Animated background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className="relative flex flex-col items-center gap-4 group-hover:scale-105 transition-transform duration-500">
                                            <div className="p-4 rounded-2xl bg-background border border-border shadow-sm group-hover:shadow-xl group-hover:border-primary transition-all duration-500">
                                                <ImageIcon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors duration-300">Upload Logo</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">PNG, JPG, SVG • Max 2MB</p>
                                            </div>
                                        </div>
                                        <label htmlFor="logo-upload" className="sr-only">Upload logo image</label>
                                        <input
                                            id="logo-upload"
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            aria-label="Upload logo image file"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative h-40 w-full rounded-3xl border-2 border-border bg-gradient-to-br from-background to-muted/20 flex items-center justify-center overflow-hidden shadow-inner">
                                        <img src={watch("logo")} alt="Logo" className="max-h-32 max-w-[85%] object-contain drop-shadow-xl" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-3 right-3 w-10 h-10 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
                                            onClick={() => setValue("logo", "")}
                                        >
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </TooltipProvider>
    );
};

// Memoize to prevent unnecessary rerenders
export const QRControls = memo(QRControlsComponent);
