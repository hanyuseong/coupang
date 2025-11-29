"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, uploadProductImage, deleteProductImage } from "@/services/product-service";
import { getCategories } from "@/services/category-service";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
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
import { X, Upload } from "lucide-react";

const productSchema = z.object({
    name: z.string().min(1, "상품명을 입력해주세요."),
    description: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().min(0, "가격은 0원 이상이어야 합니다."),
    discountPrice: z.number().optional(),
    stock: z.number().min(0, "재고는 0개 이상이어야 합니다."),
    status: z.enum(["ACTIVE", "INACTIVE", "DELETED"]),
    categoryId: z.number().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product | null;
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            price: 0,
            discountPrice: undefined,
            stock: 0,
            status: "ACTIVE",
            categoryId: undefined,
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                description: product.description || "",
                brand: product.brand || "",
                price: product.price,
                discountPrice: product.discountPrice,
                stock: product.stock,
                status: product.status,
                categoryId: product.category?.categoryId,
            });
        } else {
            form.reset({
                name: "",
                description: "",
                brand: "",
                price: 0,
                discountPrice: undefined,
                stock: 0,
                status: "ACTIVE",
                categoryId: undefined,
            });
        }
    }, [product, form]);

    const createMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            onOpenChange(false);
            form.reset();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: ProductFormValues) =>
            updateProduct(product!.productId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            onOpenChange(false);
            form.reset();
        },
    });

    const uploadImageMutation = useMutation({
        mutationFn: async (file: File) => {
            if (!product) return;
            await uploadProductImage(product.productId, file);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const deleteImageMutation = useMutation({
        mutationFn: deleteProductImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const onSubmit = (data: ProductFormValues) => {
        if (product) {
            updateMutation.mutate(data);
        } else {
            createMutation.mutate(data);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && product) {
            setUploading(true);
            try {
                await uploadImageMutation.mutateAsync(e.target.files[0]);
            } finally {
                setUploading(false);
                // Reset file input
                e.target.value = '';
            }
        }
    };

    // Flatten categories for the select dropdown (simplified for now)
    // In a real app, you might want a tree selector
    const flatCategories = categories || [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {product ? "상품 수정" : "상품 등록"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>상품명</FormLabel>
                                    <FormControl>
                                        <Input placeholder="상품명을 입력하세요" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>브랜드</FormLabel>
                                        <FormControl>
                                            <Input placeholder="브랜드" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>카테고리</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={field.value ? String(field.value) : undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="카테고리 선택" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {flatCategories.map((category) => (
                                                    <SelectItem
                                                        key={category.categoryId}
                                                        value={String(category.categoryId)}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>설명</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="상품 설명을 입력하세요"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>가격</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discountPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>할인가</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>재고</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>상태</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="상태 선택" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ACTIVE">판매중</SelectItem>
                                            <SelectItem value="INACTIVE">품절</SelectItem>
                                            <SelectItem value="DELETED">삭제됨</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {product && (
                            <div className="space-y-4">
                                <FormLabel>상품 이미지</FormLabel>
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images?.map((image) => (
                                        <div key={image.imageId} className="relative group aspect-square border rounded-md overflow-hidden">
                                            <img
                                                src={`http://localhost:8080${image.imageUrl}`}
                                                alt="Product"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => deleteImageMutation.mutate(image.imageId)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="border-2 border-dashed rounded-md flex items-center justify-center aspect-square cursor-pointer hover:bg-gray-50 relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                            disabled={uploading}
                                        />
                                        <div className="text-center">
                                            <Upload className="h-6 w-6 mx-auto text-gray-400" />
                                            <span className="text-xs text-gray-500">
                                                {uploading ? "업로드 중..." : "이미지 추가"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                취소
                            </Button>
                            <Button type="submit">
                                {product ? "수정" : "등록"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
