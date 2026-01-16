"use client";

import { useState } from "react";
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
    History,
    Save,
    Rocket
} from "lucide-react";
import { qrFormSchema, type QRFormData, type QRType, type QRHistoryItem } from "../types/qr-types";
import { URLForm, TextForm, PhoneForm, EmailForm, WhatsAppForm, WiFiForm, LocationForm } from "./qr-type-forms";
import { QRControls } from "./qr-controls";
import { QRPreview } from "./qr-preview";
import { QRHistory } from "./qr-history";
import { useQRHistory } from "../hooks/use-qr-history";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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
            fgColor: "#000000",
            bgColor: "#ffffff",
            size: 512,
            level: "L",
            rounded: false,
            margin: true,
        },
        mode: "onChange",
    });

    const handleSave = () => {
        const data = form.getValues();
        if (qrName.trim()) {
            saveHistory(data, qrName.trim());
            toast.success("Saved to history");
            setIsSaveDialogOpen(false);
            setQrName("");
        }
    };

    const handleHistorySelect = (item: QRHistoryItem) => {
        // Remove metadata and reset form
        const { id, name, createdAt, ...rest } = item;
        form.reset(rest);
        setActiveTab(rest.type);
        toast.info("Configuration reloaded");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & Configuration */}
            <div className="lg:col-span-7 space-y-6">
                <Form {...form}>
                    <form className="space-y-6">
                        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Rocket className="w-5 h-5 text-primary" />
                                    QR Generation
                                </CardTitle>
                                <CardDescription>
                                    Select a type and fill in the details to generate your QR code.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Tabs value={activeTab} onValueChange={(v) => {
                                    setActiveTab(v as QRType);
                                    form.setValue('type', v as QRType);
                                }} className="w-full">
                                    <TabsList className="grid grid-cols-4 md:grid-cols-7 h-auto p-1 bg-muted/50">
                                        {QR_TYPES.map((type) => (
                                            <TabsTrigger
                                                key={type.value}
                                                value={type.value}
                                                className="flex flex-col gap-1 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                            >
                                                <type.icon className="w-4 h-4" />
                                                <span className="text-[10px] hidden md:inline">{type.label}</span>
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-muted/50 min-h-[140px]">
                                        <TabsContent value="url"><URLForm /></TabsContent>
                                        <TabsContent value="text"><TextForm /></TabsContent>
                                        <TabsContent value="phone"><PhoneForm /></TabsContent>
                                        <TabsContent value="email"><EmailForm /></TabsContent>
                                        <TabsContent value="whatsapp"><WhatsAppForm /></TabsContent>
                                        <TabsContent value="wifi"><WiFiForm /></TabsContent>
                                        <TabsContent value="location"><LocationForm /></TabsContent>
                                    </div>
                                </Tabs>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                        <Settings2 className="w-4 h-4" />
                                        Customization
                                    </div>
                                    <QRControls />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => form.reset()}
                                        className="rounded-full"
                                    >
                                        Clear All
                                    </Button>
                                    <AlertDialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="button"
                                                disabled={!form.formState.isValid}
                                                className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                                                onClick={() => setQrName(`${form.getValues().type} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)}
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Configuration
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="sm:max-w-[425px]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Save Configuration</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Give your QR code a name to find it later in your history.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={qrName}
                                                        onChange={(e) => setQrName(e.target.value)}
                                                        placeholder="e.g. My Website QR"
                                                        className="col-span-3"
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => setIsSaveDialogOpen(false)}>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent default since we handle it in handleSave
                                                        handleSave();
                                                    }}
                                                    disabled={!qrName.trim()}
                                                >
                                                    Save Changes
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>

                <QRHistory
                    history={history}
                    deleteHistory={deleteHistory}
                    onSelect={handleHistorySelect}
                />
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-8">
                <Card className="border-none shadow-2xl bg-gradient-to-b from-card to-card/80 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-center">Live Preview</CardTitle>
                        <CardDescription className="text-center">
                            Real-time update of your QR code
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-10">
                        <QRPreview data={form.watch()} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
