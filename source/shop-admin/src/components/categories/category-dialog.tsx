"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Category, createCategory, updateCategory, getCategories } from "@/services/category-service";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, "카테고리명을 입력해주세요."),
    parentId: z.string().optional(), // Select returns string
    sortOrder: z.coerce.number().optional(),
});

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
}

export function CategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            parentId: "root", // "root" for no parent
            sortOrder: 0,
        },
    });

    useEffect(() => {
        if (category) {
            form.reset({
                name: category.name,
                parentId: category.parentId?.toString() || "root",
                sortOrder: category.sortOrder || 0,
            });
        } else {
            form.reset({
                name: "",
                parentId: "root",
                sortOrder: 0,
            });
        }
    }, [category, form]);

    const createMutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            onOpenChange(false);
            form.reset();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Category>) =>
            updateCategory(category!.categoryId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            onOpenChange(false);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const parentId = values.parentId === "root" ? undefined : parseInt(values.parentId!);

        // Calculate depth based on parent
        let depth = 0;
        if (parentId) {
            const parent = categories?.find(c => c.categoryId === parentId);
            if (parent) {
                depth = parent.depth + 1;
            }
        }

        const data: Partial<Category> = {
            name: values.name,
            parentId: parentId,
            depth: depth,
            sortOrder: values.sortOrder,
        };

        if (category) {
            updateMutation.mutate(data);
        } else {
            createMutation.mutate(data);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {category ? "카테고리 수정" : "카테고리 등록"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>카테고리명</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="parentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>상위 카테고리</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="상위 카테고리 선택" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="root">최상위 (없음)</SelectItem>
                                            {categories?.map((c) => (
                                                // Prevent selecting itself or its children as parent (circular dependency)
                                                // For simplicity, just prevent selecting itself for now
                                                c.categoryId !== category?.categoryId && (
                                                    <SelectItem key={c.categoryId} value={c.categoryId.toString()}>
                                                        {c.name} (Depth: {c.depth})
                                                    </SelectItem>
                                                )
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sortOrder"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>정렬 순서</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                취소
                            </Button>
                            <Button type="submit">
                                {category ? "수정" : "등록"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
