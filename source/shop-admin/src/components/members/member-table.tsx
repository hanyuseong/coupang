"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Member } from "@/types/member";

interface MemberTableProps {
    members: Member[];
    isLoading: boolean;
}

export function MemberTable({ members, isLoading }: MemberTableProps) {
    const getStatusBadge = (status: string) => {
        const statusMap: { [key: string]: { label: string; className: string } } = {
            ACTIVE: { label: "활동중", className: "bg-green-100 text-green-800" },
            INACTIVE: { label: "휴면", className: "bg-gray-100 text-gray-800" },
            WITHDRAWN: { label: "탈퇴", className: "bg-red-100 text-red-800" },
            BANNED: { label: "정지", className: "bg-red-100 text-red-800" },
        };
        const statusInfo = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                {statusInfo.label}
            </span>
        );
    };

    if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>전화번호</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>가입일</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members?.map((member) => (
                        <TableRow key={member.memberId}>
                            <TableCell>{member.memberId}</TableCell>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.phone}</TableCell>
                            <TableCell>{getStatusBadge(member.status)}</TableCell>
                            <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                    {members?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                                회원이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
