/*
  Warnings:

  - You are about to drop the column `accountId` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_accountId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "accountId";
