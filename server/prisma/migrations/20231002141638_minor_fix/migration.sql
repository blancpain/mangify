/*
  Warnings:

  - You are about to drop the `meal_plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MealsToRecipes" DROP CONSTRAINT "_MealsToRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserMealPlans" DROP CONSTRAINT "_UserMealPlans_A_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_mealId_fkey";

-- DropTable
DROP TABLE "meal_plans";

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealsToRecipes" ADD CONSTRAINT "_MealsToRecipes_A_fkey" FOREIGN KEY ("A") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMealPlans" ADD CONSTRAINT "_UserMealPlans_A_fkey" FOREIGN KEY ("A") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
