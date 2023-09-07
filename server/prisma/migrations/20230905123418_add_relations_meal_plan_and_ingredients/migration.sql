/*
  Warnings:

  - You are about to drop the `_IngredientToUserData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MealPlanToUserData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToUserData" DROP CONSTRAINT "_IngredientToUserData_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToUserData" DROP CONSTRAINT "_IngredientToUserData_B_fkey";

-- DropForeignKey
ALTER TABLE "_MealPlanToUserData" DROP CONSTRAINT "_MealPlanToUserData_A_fkey";

-- DropForeignKey
ALTER TABLE "_MealPlanToUserData" DROP CONSTRAINT "_MealPlanToUserData_B_fkey";

-- DropTable
DROP TABLE "_IngredientToUserData";

-- DropTable
DROP TABLE "_MealPlanToUserData";

-- CreateTable
CREATE TABLE "_UserMealPlans" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserIngredients" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserMealPlans_AB_unique" ON "_UserMealPlans"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMealPlans_B_index" ON "_UserMealPlans"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserIngredients_AB_unique" ON "_UserIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_UserIngredients_B_index" ON "_UserIngredients"("B");

-- AddForeignKey
ALTER TABLE "_UserMealPlans" ADD CONSTRAINT "_UserMealPlans_A_fkey" FOREIGN KEY ("A") REFERENCES "meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMealPlans" ADD CONSTRAINT "_UserMealPlans_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIngredients" ADD CONSTRAINT "_UserIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIngredients" ADD CONSTRAINT "_UserIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
