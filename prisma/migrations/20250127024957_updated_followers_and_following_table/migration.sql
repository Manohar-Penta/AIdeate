/*
  Warnings:

  - You are about to drop the column `followersId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `User` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_followersId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_followingId_fkey";

-- AlterTable
ALTER TABLE "Followers" ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "followingId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "followersId",
DROP COLUMN "followingId";

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
