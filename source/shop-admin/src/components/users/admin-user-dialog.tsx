"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminUser, updateAdminUser } from "@/services/admin-user-service";
import { AdminUser } from "@/types/admin-user";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AdminUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userToEdit?: AdminUser | null;
}

export function AdminUserDialog({ open, onOpenChange, userToEdit }: AdminUserDialogProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"USER" | "ADMIN" | "MANAGER">("MANAGER");
    const queryClient = useQueryClient();

    useEffect(() => {
        if (userToEdit) {
            setEmail(userToEdit.email);
            setRole(userToEdit.role);
            setPassword(""); // Don't show password
        } else {
            setEmail("");
            setPassword("");
            setRole("MANAGER");
        }
    }, [userToEdit, open]);

    const mutation = useMutation({
        mutationFn: async () => {
            if (userToEdit) {
                await updateAdminUser(userToEdit.adminId, { email, password, role });
            } else {
                await createAdminUser({ email, password, role });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
            onOpenChange(false);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{userToEdit ? "Edit Admin User" : "Add Admin User"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={!userToEdit}
                            placeholder={userToEdit ? "Leave blank to keep current" : ""}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={role} onValueChange={(val: "USER" | "ADMIN" | "MANAGER") => setRole(val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USER">USER</SelectItem>
                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                                <SelectItem value="MANAGER">MANAGER</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
