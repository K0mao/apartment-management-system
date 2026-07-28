-- CreateTable
CREATE TABLE "UtilityBill" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "waterPrevious" INTEGER NOT NULL,
    "waterCurrent" INTEGER NOT NULL,
    "electricPrevious" INTEGER NOT NULL,
    "electricCurrent" INTEGER NOT NULL,
    "waterPrice" INTEGER NOT NULL,
    "electricPrice" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UtilityBill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UtilityBill" ADD CONSTRAINT "UtilityBill_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
