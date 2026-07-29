export interface Invoice {
  id: string;
  leaseId: string;
  utilityBillId: string;

  rentAmount: number;
  waterAmount: number;
  electricAmount: number;
  totalAmount: number;

  status: "PENDING" | "PAID" | "OVERDUE";

  createdAt: string;
  updatedAt: string;
}