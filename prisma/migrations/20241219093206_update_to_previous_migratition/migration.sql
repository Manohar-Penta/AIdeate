/*
  Warnings:

  - You are about to drop the column `userId` on the `Followers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Following` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_userId_fkey";

-- AlterTable
ALTER TABLE "Followers" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Following" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followersId" TEXT,
ADD COLUMN     "followingId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Following"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followersId_fkey" FOREIGN KEY ("followersId") REFERENCES "Followers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
