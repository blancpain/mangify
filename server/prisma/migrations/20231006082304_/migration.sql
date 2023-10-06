/*
  Warnings:

  - You are about to drop the `_UserMealPlans` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipe_external_id]` on the table `meals` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_UserMealPlans" DROP CONSTRAINT "_UserMealPlans_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserMealPlans" DROP CONSTRAINT "_UserMealPlans_B_fkey";

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileId" TEXT;

-- DropTable
DROP TABLE "_UserMealPlans";

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_external_id_key" ON "ingredients"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "meals_recipe_external_id_key" ON "meals"("recipe_external_id");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
