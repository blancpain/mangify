/*
  Warnings:

  - You are about to drop the `_UserProfileMeals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileId` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserProfileMeals" DROP CONSTRAINT "_UserProfileMeals_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserProfileMeals" DROP CONSTRAINT "_UserProfileMeals_B_fkey";

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "profileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserProfileMeals";

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
