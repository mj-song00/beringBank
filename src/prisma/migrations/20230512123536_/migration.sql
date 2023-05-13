-- CreateTable
CREATE TABLE "AccountToUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AccountToUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountToUser" ADD CONSTRAINT "AccountToUser_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountToUser" ADD CONSTRAINT "AccountToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
