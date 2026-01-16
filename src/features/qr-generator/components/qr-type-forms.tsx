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
                <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com" {...field} />
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
                <FormItem>
                    <FormLabel>Text Content</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your text here" {...field} />
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
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
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
        <div className="space-y-4">
            <FormField
                control={control}
                name="email.address"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input placeholder="hello@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="email.subject"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                            <Input placeholder="Inquiry" {...field} />
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
        <div className="space-y-4">
            <FormField
                control={control}
                name="whatsapp.phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                            <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="whatsapp.message"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="Hello!" {...field} />
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
        <div className="space-y-4">
            <FormField
                control={control}
                name="wifi.ssid"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>SSID (Network Name)</FormLabel>
                        <FormControl>
                            <Input placeholder="Home_Network" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="wifi.password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="wifi.encryption"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Encryption</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Encryption" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                                <SelectItem value="WEP">WEP</SelectItem>
                                <SelectItem value="nopass">None</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

export function LocationForm() {
    const { control } = useFormContext<QRFormData>();
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={control}
                name="location.lat"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                            <Input placeholder="0.0000" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="location.lng"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                            <Input placeholder="0.0000" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
