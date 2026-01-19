"use client";

import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { QRFormData } from "../types/qr-types";

export function URLForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <FormField
            control={control}
            name="url"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Endpoint URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://your-domain.com" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function TextForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <FormField
            control={control}
            name="text"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Plain Text Payload</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Type your message here..." className="min-h-[100px] rounded-xl border-border bg-background focus-visible:ring-primary/20 resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function PhoneForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <FormField
            control={control}
            name="phone"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Contact Number</FormLabel>
                    <FormControl>
                        <Input placeholder="+1 (555) 000-0000" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function EmailForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <div className="space-y-5">
            <FormField
                control={control}
                name="email.address"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Recipient Address</FormLabel>
                        <FormControl>
                            <Input placeholder="contact@brand.com" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="email.subject"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Message Subject</FormLabel>
                        <FormControl>
                            <Input placeholder="Inquiry regarding services" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

export function WhatsAppForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <div className="space-y-5">
            <FormField
                control={control}
                name="whatsapp.phone"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">WhatsApp ID (Phone)</FormLabel>
                        <FormControl>
                            <Input placeholder="15550000000" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="whatsapp.message"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Initial Greeting</FormLabel>
                        <FormControl>
                            <Input placeholder="I'm interested in your work." className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

export function WiFiForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <div className="space-y-5">
            <FormField
                control={control}
                name="wifi.ssid"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Network Name (SSID)</FormLabel>
                        <FormControl>
                            <Input placeholder="Studio_Private_5G" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="wifi.password"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Security Key</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="wifi.encryption"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Protocol</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-12 rounded-xl border-border bg-background focus:ring-primary/20">
                                        <SelectValue placeholder="Protocol" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl border-border shadow-2xl bg-card">
                                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                                    <SelectItem value="WEP">WEP</SelectItem>
                                    <SelectItem value="nopass">Open</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

export function LocationForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <div className="grid grid-cols-2 gap-5">
            <FormField
                control={control}
                name="location.lat"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Latitude</FormLabel>
                        <FormControl>
                            <Input placeholder="40.7128" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="location.lng"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/80">Longitude</FormLabel>
                        <FormControl>
                            <Input placeholder="-74.0060" className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
