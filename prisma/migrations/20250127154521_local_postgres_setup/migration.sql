/*
  Warnings:

  - A unique constraint covering the columns `[userId,followerId]` on the table `Followers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,followingId]` on the table `Following` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Followers_userId_followerId_key" ON "Followers"("userId", "followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Following_userId_followingId_key" ON "Following"("userId", "followingId");
