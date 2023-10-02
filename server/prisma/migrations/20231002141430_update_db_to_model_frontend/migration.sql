/*
  Warnings:

  - You are about to drop the column `mealPlanId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `measurment` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `meal_plans` table. All the data in the column will be lost.
  - You are about to drop the column `max_calories` on the `user_data` table. All the data in the column will be lost.
  - You are about to drop the `_FoodsAvoidedBy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodsLikedBy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `foods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mealId` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meals_per_day` to the `user_data` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'VERYACTIVE');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSEWEIGHT', 'MAINTAIN', 'GAINWEIGHT');

-- DropForeignKey
ALTER TABLE "_FoodsAvoidedBy" DROP CONSTRAINT "_FoodsAvoidedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodsAvoidedBy" DROP CONSTRAINT "_FoodsAvoidedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_FoodsLikedBy" DROP CONSTRAINT "_FoodsLikedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodsLikedBy" DROP CONSTRAINT "_FoodsLikedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_mealPlanId_fkey";

-- DropIndex
DROP INDEX "user_data_diet_max_calories_idx";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "mealPlanId",
DROP COLUMN "measurment",
DROP COLUMN "quantity",
DROP COLUMN "unit",
ADD COLUMN     "mealId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "meal_plans" DROP COLUMN "external_id";

-- AlterTable
ALTER TABLE "user_data" DROP COLUMN "max_calories",
ADD COLUMN     "activity_level" "ActivityLevel" NOT NULL DEFAULT 'MODERATE',
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "favorite_cuisines" TEXT[],
ADD COLUMN     "goal" "Goal" DEFAULT 'MAINTAIN',
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "intolerances" TEXT[],
ADD COLUMN     "meals_per_day" INTEGER NOT NULL,
ADD COLUMN     "sex" "Sex",
ADD COLUMN     "weight" INTEGER;

-- DropTable
DROP TABLE "_FoodsAvoidedBy";

-- DropTable
DROP TABLE "_FoodsLikedBy";

-- DropTable
DROP TABLE "foods";

-- CreateTable
CREATE TABLE "_MealsToRecipes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealsToRecipes_AB_unique" ON "_MealsToRecipes"("A", "B");

-- CreateIndex
CREATE INDEX "_MealsToRecipes_B_index" ON "_MealsToRecipes"("B");

-- CreateIndex
CREATE INDEX "user_data_diet_sex_activity_level_goal_height_weight_idx" ON "user_data"("diet", "sex", "activity_level", "goal", "height", "weight");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealsToRecipes" ADD CONSTRAINT "_MealsToRecipes_A_fkey" FOREIGN KEY ("A") REFERENCES "meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealsToRecipes" ADD CONSTRAINT "_MealsToRecipes_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
