"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, RefreshCcw, History, Clock, FileText, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import type { QRHistoryItem } from "../types/qr-types";
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
import { motion, AnimatePresence } from "framer-motion";

interface QRHistoryProps {
    history: QRHistoryItem[];
    deleteHistory: (id: string) => void;
    onSelect: (item: QRHistoryItem) => void;
}

export function QRHistory({ history, deleteHistory, onSelect }: QRHistoryProps) {
    if (history.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group p-12 border-2 border-dashed border-border rounded-[2.5rem] bg-muted/30 flex flex-col items-center justify-center text-center transition-colors"
            >
                <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-4 shadow-sm">
                    <History className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-xl font-black italic tracking-tight">Empty Workspace</p>
                <p className="text-muted-foreground text-sm max-w-[220px] mt-2 font-medium">Your creative artifacts will appear here once saved.</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                        <History className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">Saved Artifacts</h2>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground">
                    {history.length} ITEMS
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                    {history.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card className="border border-border shadow-xl bg-card group hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden relative">
                                <div className="absolute top-4 right-4 z-10 flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-10 h-10 rounded-full bg-background/90 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                        onClick={() => onSelect(item)}
                                        aria-label={`Restore configuration: ${item.name}`}
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="w-10 h-10 rounded-full bg-background/90 backdrop-blur border-border text-destructive hover:bg-destructive hover:text-white transition-all duration-300"
                                                aria-label={`Delete configuration: ${item.name}`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-[2.5rem] border-border shadow-2xl bg-card p-8">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-2xl font-black">Archive Deletion</AlertDialogTitle>
                                                <AlertDialogDescription className="text-muted-foreground font-medium text-base mt-2">
                                                    This will remove "{item.name}" from your local storage permanently.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="mt-8 gap-3">
                                                <AlertDialogCancel className="h-14 rounded-2xl border-border font-bold px-8">Cancel Operation</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => deleteHistory(item.id)}
                                                    className="h-14 rounded-2xl bg-destructive text-white hover:bg-destructive/90 font-black uppercase tracking-widest text-xs px-10"
                                                >
                                                    Confirm Deletion
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>

                                <CardContent className="p-8">
                                    <div className="flex flex-col gap-6">
                                        <div className="space-y-2 pr-20">
                                            <h4 className="font-black text-lg line-clamp-1 group-hover:text-primary transition-colors italic tracking-tight">
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                                                <span className="px-2 py-0.5 rounded bg-muted text-foreground border border-border">{item.type}</span>
                                                <span className="flex items-center gap-1.5 opacity-80">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {format(item.createdAt, "MMM d, yyyy")}
                                                </span>
                                            </div>
                                        </div>



                                        <Button
                                            variant="outline"
                                            className="group/btn relative w-full justify-between h-14 px-6 rounded-2xl bg-background border-2 border-border text-xs font-black uppercase tracking-[0.2em] hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
                                            onClick={() => onSelect(item)}
                                        >
                                            {/* Animated gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-2xl" />

                                            {/* Content */}
                                            <span className="relative z-10 group-hover/btn:text-primary transition-colors duration-300">
                                                Restore Configuration
                                            </span>
                                            <ExternalLink className="relative z-10 w-4 h-4 opacity-60 group-hover/btn:opacity-100 group-hover/btn:text-primary group-hover/btn:rotate-45 group-hover/btn:scale-110 transition-all duration-500" />
                                        </Button>

                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
