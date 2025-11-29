"use client";

import { useState } from "react";
import { AdminUserTable } from "@/components/users/admin-user-table";
import { AdminUserDialog } from "@/components/users/admin-user-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminUser } from "@/types/admin-user";

import { AdminLayout } from "@/components/layout/admin-layout";

export default function UsersPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);

    const handleAddUser = () => {
        setUserToEdit(null);
        setIsDialogOpen(true);
    };

    const handleEditUser = (user: AdminUser) => {
        setUserToEdit(user);
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Admin Users</h1>
                    <Button onClick={handleAddUser}>
                        <Plus className="mr-2 h-4 w-4" /> Add User
                    </Button>
                </div>

                <AdminUserTable onEdit={handleEditUser} />

                <AdminUserDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    userToEdit={userToEdit}
                />
            </div>
        </AdminLayout>
    );
}
