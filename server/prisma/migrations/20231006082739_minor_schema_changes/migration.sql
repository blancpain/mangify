/*
  Warnings:

  - You are about to drop the column `profileId` on the `meals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_profileId_fkey";

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "profileId";

-- CreateTable
CREATE TABLE "_UserProfileMeals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserProfileMeals_AB_unique" ON "_UserProfileMeals"("A", "B");

-- CreateIndex
CREATE INDEX "_UserProfileMeals_B_index" ON "_UserProfileMeals"("B");

-- AddForeignKey
ALTER TABLE "_UserProfileMeals" ADD CONSTRAINT "_UserProfileMeals_A_fkey" FOREIGN KEY ("A") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProfileMeals" ADD CONSTRAINT "_UserProfileMeals_B_fkey" FOREIGN KEY ("B") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
