/*
  Warnings:

  - You are about to drop the column `mealId` on the `ingredients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_mealId_fkey";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "mealId";

-- CreateTable
CREATE TABLE "_IngredientsToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientsToMeal_AB_unique" ON "_IngredientsToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientsToMeal_B_index" ON "_IngredientsToMeal"("B");

-- AddForeignKey
ALTER TABLE "_IngredientsToMeal" ADD CONSTRAINT "_IngredientsToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientsToMeal" ADD CONSTRAINT "_IngredientsToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
