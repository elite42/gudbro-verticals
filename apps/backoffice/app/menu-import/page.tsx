"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

// Mock data to simulate AI extraction
const MOCK_EXTRACTED_DATA = [
    {
        name: "Cappuccino",
        description: "Rich espresso with steamed milk and foam.",
        price: 4.50,
        category: "Coffee",
    },
    {
        name: "Avocado Toast",
        description: "Sourdough bread topped with smashed avocado, chili flakes, and poached egg.",
        price: 12.00,
        category: "Breakfast",
    },
    {
        name: "Green Smoothie",
        description: "Spinach, kale, apple, banana, and lemon.",
        price: 8.50,
        category: "Drinks",
    },
];

export default function MenuImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [extractedItems, setExtractedItems] = useState<typeof MOCK_EXTRACTED_DATA | null>(null);
    const [step, setStep] = useState<"upload" | "processing" | "review">("upload");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        setStep("processing");
        setIsUploading(true);
        setProgress(0);

        // Simulate upload and AI processing
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setExtractedItems(MOCK_EXTRACTED_DATA);
                    setStep("review");
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Import Menu</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Upload a photo or PDF of your menu, and our AI will extract the items for you.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Left Column: Upload / Status */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Upload Menu</CardTitle>
                            <CardDescription>Supported formats: JPG, PNG, PDF</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="menu-file">Menu File</Label>
                                <Input id="menu-file" type="file" accept="image/*,.pdf" onChange={handleFileChange} disabled={step !== "upload"} />
                            </div>

                            {file && step === "upload" && (
                                <div className="mt-4">
                                    <Button onClick={handleUpload} className="w-full">
                                        <Upload className="mr-2 h-4 w-4" /> Start AI Extraction
                                    </Button>
                                </div>
                            )}

                            {step === "processing" && (
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center text-zinc-600">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                        </span>
                                        <span>{progress}%</span>
                                    </div>
                                    <Progress value={progress} />
                                    <p className="text-xs text-zinc-500 mt-2">
                                        Analyzing image, identifying text, and categorizing items...
                                    </p>
                                </div>
                            )}

                            {step === "review" && (
                                <div className="mt-4 rounded-md bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                    <div className="flex items-center">
                                        <CheckCircle2 className="mr-2 h-5 w-5" />
                                        <span className="font-medium">Extraction Complete!</span>
                                    </div>
                                    <p className="mt-1 text-sm">Found {extractedItems?.length} items.</p>
                                    <Button variant="outline" size="sm" className="mt-3 w-full border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900/50" onClick={() => {
                                        setStep("upload");
                                        setFile(null);
                                        setExtractedItems(null);
                                    }}>
                                        Upload Another
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-zinc-500 space-y-2">
                            <p>• Ensure good lighting and clear text.</p>
                            <p>• Avoid shadows covering the prices.</p>
                            <p>• Handwritten menus may have lower accuracy.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Review Area */}
                <div className="md:col-span-2">
                    {step === "review" && extractedItems ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>2. Review & Edit</CardTitle>
                                <CardDescription>
                                    Please verify the extracted information before saving to your database.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="w-[100px]">Price</TableHead>
                                            <TableHead className="w-[120px]">Category</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {extractedItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">
                                                    <Input defaultValue={item.name} className="h-8" />
                                                </TableCell>
                                                <TableCell>
                                                    <Textarea defaultValue={item.description} className="h-16 text-xs resize-none" />
                                                </TableCell>
                                                <TableCell>
                                                    <Input defaultValue={item.price.toFixed(2)} className="h-8" type="number" step="0.01" />
                                                </TableCell>
                                                <TableCell>
                                                    <Input defaultValue={item.category} className="h-8" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <Button variant="outline">Discard</Button>
                                    <Button>Save to Database</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <div className="flex flex-col items-center text-center text-zinc-500">
                                <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">No Data Yet</h3>
                                <p className="mb-4 max-w-xs text-sm">
                                    Upload a menu file to see the extracted items here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
