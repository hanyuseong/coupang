"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminUsers, deleteAdminUser } from "@/services/admin-user-service";
import { AdminUser } from "@/types/admin-user";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

interface AdminUserTableProps {
    onEdit: (user: AdminUser) => void;
}

export function AdminUserTable({ onEdit }: AdminUserTableProps) {
    const queryClient = useQueryClient();
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["adminUsers"],
        queryFn: getAdminUsers,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAdminUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
        },
    });

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.adminId}>
                            <TableCell>{user.adminId}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{new Date(user.createdAt || "").toLocaleDateString()}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(user.adminId)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
