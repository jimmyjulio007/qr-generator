"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, RefreshCw, Calendar } from "lucide-react";
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

interface QRHistoryProps {
    history: QRHistoryItem[];
    deleteHistory: (id: string) => void;
    onSelect: (item: QRHistoryItem) => void;
}

export function QRHistory({ history, deleteHistory, onSelect }: QRHistoryProps) {
    if (history.length === 0) {
        return (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                    <Calendar className="w-10 h-10 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground text-sm">No history yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    <span>Recent Generations</span>
                    <span className="text-xs font-normal text-muted-foreground">{history.length} items</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((item) => (
                            <TableRow key={item.id} className="group">
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                    <span className="capitalize px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold">
                                        {item.type}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                    {format(item.createdAt, "MMM d, HH:mm")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-8 h-8"
                                            onClick={() => onSelect(item)}
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete the saved QR configuration for "{item.name}".
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => deleteHistory(item.id)}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
