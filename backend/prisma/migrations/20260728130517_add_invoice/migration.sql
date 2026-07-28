-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "utilityBillId" TEXT NOT NULL,
    "rentAmount" INTEGER NOT NULL,
    "waterAmount" INTEGER NOT NULL,
    "electricAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_utilityBillId_key" ON "Invoice"("utilityBillId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_utilityBillId_fkey" FOREIGN KEY ("utilityBillId") REFERENCES "UtilityBill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
