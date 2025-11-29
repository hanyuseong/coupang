import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface RecentSalesProps {
    orders: any[]; // Replace with proper type
}

export function RecentSales({ orders }: RecentSalesProps) {
    return (
        <div className="space-y-8">
            {orders?.map((order) => (
                <div key={order.orderId} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{order.memberName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{order.memberName}</p>
                        <p className="text-sm text-muted-foreground">
                            {order.memberEmail}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+{order.totalAmount.toLocaleString()}원</div>
                </div>
            ))}
            {orders?.length === 0 && (
                <div className="text-center text-sm text-muted-foreground">
                    최근 주문 내역이 없습니다.
                </div>
            )}
        </div>
    );
}
