"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { MemberTable } from "@/components/members/member-table";
import { getMembers } from "@/services/member-service";

export default function MembersPage() {
    const { data: members, isLoading } = useQuery({
        queryKey: ["members"],
        queryFn: getMembers,
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">회원 관리</h1>
                </div>

                <MemberTable
                    members={members || []}
                    isLoading={isLoading}
                />
            </div>
        </AdminLayout>
    );
}
