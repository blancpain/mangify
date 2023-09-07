/*
  Warnings:

  - You are about to drop the column `favorite_recipes` on the `user_preference` table. All the data in the column will be lost.
  - You are about to drop the column `foods_to_avoid` on the `user_preference` table. All the data in the column will be lost.
  - You are about to drop the column `groceries` on the `user_preference` table. All the data in the column will be lost.
  - You are about to drop the column `meal_plan` on the `user_preference` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_preference" DROP CONSTRAINT "user_preference_userId_fkey";

-- DropIndex
DROP INDEX "users_email_idx";

-- AlterTable
ALTER TABLE "user_preference" DROP COLUMN "favorite_recipes",
DROP COLUMN "foods_to_avoid",
DROP COLUMN "groceries",
DROP COLUMN "meal_plan";

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_plans" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "measurment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mealPlanId" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoodsLikedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FoodsAvoidedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipesLikedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipesAvoidedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MealPlanToUserData" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToUserData" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodsLikedBy_AB_unique" ON "_FoodsLikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodsLikedBy_B_index" ON "_FoodsLikedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodsAvoidedBy_AB_unique" ON "_FoodsAvoidedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodsAvoidedBy_B_index" ON "_FoodsAvoidedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipesLikedBy_AB_unique" ON "_RecipesLikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipesLikedBy_B_index" ON "_RecipesLikedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipesAvoidedBy_AB_unique" ON "_RecipesAvoidedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipesAvoidedBy_B_index" ON "_RecipesAvoidedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealPlanToUserData_AB_unique" ON "_MealPlanToUserData"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPlanToUserData_B_index" ON "_MealPlanToUserData"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToUserData_AB_unique" ON "_IngredientToUserData"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToUserData_B_index" ON "_IngredientToUserData"("B");

-- CreateIndex
CREATE INDEX "user_preference_diet_max_calories_idx" ON "user_preference"("diet", "max_calories");

-- CreateIndex
CREATE INDEX "users_email_role_idx" ON "users"("email", "role");

-- AddForeignKey
ALTER TABLE "user_preference" ADD CONSTRAINT "user_preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "meal_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodsLikedBy" ADD CONSTRAINT "_FoodsLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodsLikedBy" ADD CONSTRAINT "_FoodsLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodsAvoidedBy" ADD CONSTRAINT "_FoodsAvoidedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodsAvoidedBy" ADD CONSTRAINT "_FoodsAvoidedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesLikedBy" ADD CONSTRAINT "_RecipesLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesLikedBy" ADD CONSTRAINT "_RecipesLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesAvoidedBy" ADD CONSTRAINT "_RecipesAvoidedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesAvoidedBy" ADD CONSTRAINT "_RecipesAvoidedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPlanToUserData" ADD CONSTRAINT "_MealPlanToUserData_A_fkey" FOREIGN KEY ("A") REFERENCES "meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPlanToUserData" ADD CONSTRAINT "_MealPlanToUserData_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToUserData" ADD CONSTRAINT "_IngredientToUserData_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToUserData" ADD CONSTRAINT "_IngredientToUserData_B_fkey" FOREIGN KEY ("B") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
