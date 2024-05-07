/*
  Warnings:

  - You are about to drop the `_Followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_B_fkey";

-- DropTable
DROP TABLE "_Followers";

-- CreateTable
CREATE TABLE "User_User_Follows" (
    "followerId" TEXT NOT NULL,
    "followeeId" TEXT NOT NULL,

    CONSTRAINT "User_User_Follows_pkey" PRIMARY KEY ("followerId","followeeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_Follows_followerId_key" ON "User_User_Follows"("followerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_Follows_followeeId_key" ON "User_User_Follows"("followeeId");

-- CreateIndex
CREATE INDEX "User_User_Follows_followerId_followeeId_idx" ON "User_User_Follows"("followerId", "followeeId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- AddForeignKey
ALTER TABLE "User_User_Follows" ADD CONSTRAINT "User_User_Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_User_Follows" ADD CONSTRAINT "User_User_Follows_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
