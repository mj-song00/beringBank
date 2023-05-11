/*
  Warnings:

  - Added the required column `createAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "withdrawCash" SET DEFAULT 0,
ALTER COLUMN "depositCash" SET DEFAULT 0,
ALTER COLUMN "accountBalance" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "accountId" INTEGER,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
