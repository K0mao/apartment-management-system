/*
  Warnings:

  - A unique constraint covering the columns `[roomNumber,apartmentId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `floor` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRent` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_apartmentId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "monthlyRent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "RoomStatus" NOT NULL DEFAULT 'AVAILABLE';

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomNumber_apartmentId_key" ON "Room"("roomNumber", "apartmentId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
