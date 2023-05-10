/*
  Warnings:

  - You are about to drop the column `userUserId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userUserId` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_id_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userUserId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "userUserId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cashWithdraw" SET DEFAULT 0,
ALTER COLUMN "cashDeposit" SET DEFAULT 0,
ALTER COLUMN "cashBalance" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
