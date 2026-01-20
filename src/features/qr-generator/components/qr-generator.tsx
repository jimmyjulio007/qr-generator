"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Globe,
    Type,
    Phone,
    Mail,
    MessageCircle,
    Wifi,
    MapPin,
    Settings2,
    Save,
    Sparkles,
    Trash2,
    RefreshCcw
} from "lucide-react";
import { qrFormSchema, type QRFormData, type QRType, type QRHistoryItem } from "../types/qr-types";
import { URLForm, TextForm, PhoneForm, EmailForm, WhatsAppForm, WiFiForm, LocationForm } from "./qr-type-forms";
import { QRControls } from "./qr-controls";
import { QRPreview } from "./qr-preview";
import { QRHistory } from "./qr-history";
import { useQRHistory } from "../hooks/use-qr-history";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

const QR_TYPES: { label: string; value: QRType; icon: any }[] = [
    { label: "URL", value: "url", icon: Globe },
    { label: "Text", value: "text", icon: Type },
    { label: "Phone", value: "phone", icon: Phone },
    { label: "Email", value: "email", icon: Mail },
    { label: "WhatsApp", value: "whatsapp", icon: MessageCircle },
    { label: "Wi-Fi", value: "wifi", icon: Wifi },
    { label: "Location", value: "location", icon: MapPin },
];

export function QRGenerator() {
    const [activeTab, setActiveTab] = useState<QRType>("url");
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [qrName, setQrName] = useState("");
    const { history, saveHistory, deleteHistory } = useQRHistory();

    const form = useForm<QRFormData>({
        resolver: zodResolver(qrFormSchema) as any,
        defaultValues: {
            type: "url",
            url: "",
            text: "",
            phone: "",
            email: { address: "", subject: "", body: "" },
            whatsapp: { phone: "", message: "" },
            wifi: { ssid: "", password: "", encryption: "WPA", hidden: false },
            location: { lat: "", lng: "" },
            fgColor: "#0f172a",
            bgColor: "#ffffff",
            size: 1024,
            level: "Q",
            margin: true,
            dotsPattern: "square",
            eyeStyle: "square",
            gradientType: "none",
            gradientColor1: "#0f172a",
            gradientColor2: "#3b82f6",
            gradientRotation: 0,
        },
        mode: "onChange",
    });

    const handleSave = useCallback(() => {
        const data = form.getValues();
        if (qrName.trim()) {
            saveHistory(data, qrName.trim());
            toast.success("Saved to history");
            setIsSaveDialogOpen(false);
            setQrName("");
        }
    }, [qrName, form, saveHistory]);

    const handleHistorySelect = useCallback((item: QRHistoryItem) => {
        const { id, name, createdAt, ...rest } = item;
        form.reset(rest as any);
        setActiveTab(rest.type);
        toast.info("Configuration reloaded");
    }, [form]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-[1400px] mx-auto antialiased px-6 sm:px-10 lg:px-16 xl:px-20">
            {/* Left Column: Studio Controls */}
            <div className="lg:col-span-7 space-y-8">
                <Form {...form}>
                    <form className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="border border-border shadow-2xl bg-card rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                                <CardHeader className="pb-6 pt-6 sm:pb-8 sm:pt-10 px-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="flex items-center gap-3 text-3xl font-black tracking-tight">
                                                <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                                                    <Sparkles className="w-6 h-6" />
                                                </div>
                                                QR Studio
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground font-medium text-base">
                                                High-fidelity vector generator.
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => form.reset()}
                                                className="rounded-full h-10 w-10 border-border hover:bg-muted transition-colors"
                                                aria-label="Reset configuration to defaults"
                                            >
                                                <RefreshCcw className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 sm:space-y-8 pb-8 sm:pb-10 px-4 sm:px-6">
                                    <Tabs value={activeTab} onValueChange={(v) => {
                                        setActiveTab(v as QRType);
                                        form.setValue('type', v as QRType);
                                    }} className="w-full">
                                        <div className="relative p-3 bg-gradient-to-br from-muted via-muted/80 to-muted/60 border-2 border-border rounded-[1.5rem] shadow-inner">
                                            <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 h-auto gap-2.5 bg-transparent p-0">
                                                {QR_TYPES.map((type) => (
                                                    <TabsTrigger
                                                        key={type.value}
                                                        value={type.value}
                                                        className="group relative flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-xl transition-all duration-500 data-[state=inactive]:text-muted-foreground data-[state=active]:text-foreground hover:text-foreground font-black text-[9px] sm:text-[10px] uppercase tracking-[0.1em] data-[state=inactive]:hover:bg-background/50"
                                                    >
                                                        {/* Active background */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95 rounded-xl shadow-2xl opacity-0 scale-95 data-[state=active]:opacity-100 data-[state=active]:scale-100 transition-all duration-500 group-data-[state=active]:opacity-100 group-data-[state=active]:scale-100" />

                                                        {/* Active border glow */}
                                                        <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-data-[state=active]:border-primary/20 transition-all duration-500" />

                                                        {/* Icon */}
                                                        <type.icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all duration-500 group-data-[state=active]:text-primary group-data-[state=active]:scale-110 group-data-[state=active]:rotate-12" />

                                                        {/* Label */}
                                                        <span className="relative z-10 text-center leading-tight">{type.label}</span>

                                                        {/* Hover gradient */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>
                                        </div>

                                        <div className="mt-6 sm:mt-8">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeTab}
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[1.5rem] bg-muted/30 border border-border min-h-[140px] sm:min-h-[180px] flex items-center shadow-inner"
                                                >
                                                    <div className="w-full">
                                                        <TabsContent value="url" className="mt-0"><URLForm /></TabsContent>
                                                        <TabsContent value="text" className="mt-0"><TextForm /></TabsContent>
                                                        <TabsContent value="phone" className="mt-0"><PhoneForm /></TabsContent>
                                                        <TabsContent value="email" className="mt-0"><EmailForm /></TabsContent>
                                                        <TabsContent value="whatsapp" className="mt-0"><WhatsAppForm /></TabsContent>
                                                        <TabsContent value="wifi" className="mt-0"><WiFiForm /></TabsContent>
                                                        <TabsContent value="location" className="mt-0"><LocationForm /></TabsContent>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </Tabs>

                                    <div className="space-y-6 sm:space-y-8 border-t border-border pt-6 sm:pt-8">
                                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-foreground">
                                            <Settings2 className="w-4 h-4" />
                                            Studio Controls
                                        </div>
                                        <QRControls />
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                                        <AlertDialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    type="button"
                                                    disabled={!form.formState.isValid}
                                                    className="h-12 sm:h-14 px-6 sm:px-10 rounded-xl sm:rounded-2xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-2xl font-black uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-xs w-full sm:w-auto"
                                                    onClick={() => setQrName(`${form.getValues().type} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)}
                                                >
                                                    <Save className="w-4 h-4 mr-3" />
                                                    Save Configuration
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="rounded-2xl sm:rounded-[2.5rem] border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] bg-card p-6 sm:p-8 max-w-[90vw] sm:max-w-lg">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-3xl font-black">Save Configuration</AlertDialogTitle>
                                                    <AlertDialogDescription className="text-muted-foreground font-medium text-base mt-2">
                                                        Name your creative workspace.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <div className="py-8">
                                                    <div className="space-y-3">
                                                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest ml-1 text-foreground">Workspace Name</Label>
                                                        <Input
                                                            id="name"
                                                            value={qrName}
                                                            onChange={(e) => setQrName(e.target.value)}
                                                            placeholder="e.g. Portfolio Website"
                                                            className="h-14 rounded-2xl border-border bg-background px-6 focus-visible:ring-primary/20 text-lg font-bold"
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>
                                                <AlertDialogFooter className="gap-3">
                                                    <AlertDialogCancel className="h-14 rounded-2xl border-border hover:bg-muted font-bold px-8">
                                                        Discard
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSave();
                                                        }}
                                                        disabled={!qrName.trim()}
                                                        className="h-14 rounded-2xl px-10 font-black uppercase tracking-widest text-xs"
                                                    >
                                                        Confirm Save
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </form>
                </Form>

                <QRHistory
                    history={history}
                    deleteHistory={deleteHistory}
                    onSelect={handleHistorySelect}
                />
            </div>

            {/* Right Column: Live Viewport */}
            <div className="lg:col-span-5 lg:sticky lg:top-12 order-first lg:order-last">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <Card className="border border-border max-w-[760px] mx-auto shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] bg-card rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden">
                        <CardHeader className="text-center pt-10 pb-4">
                            <CardTitle className="text-[11px] font-black tracking-[0.3em] uppercase text-muted-foreground flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-border" />
                                Real-Time Render
                                <div className="h-px w-8 bg-border" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-16 pt-8">
                            <QRPreview data={form.watch()} key={JSON.stringify(form.watch())} />
                        </CardContent>
                    </Card>

                    {/* Quality Assurance Card */}
                    <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/10">
                                    <Sparkles className="w-5 h-5 text-white/80" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Production Grade</h3>
                            </div>
                            <p className="text-sm font-medium text-primary-foreground/80 leading-relaxed">
                                Our engine generates high-fidelity mathematical vectors.
                                Guaranteed scanability at any resolution from print to digital.
                            </p>
                        </div>
                        {/* Abstract Circle */}
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
