export interface Order {
    orderId: number;
    memberId: number;
    memberName: string;
    memberEmail: string;
    orderStatus: string;
    totalAmount: number;
    deliveryFee: number;
    createdAt: string;
    summary: string;
}
