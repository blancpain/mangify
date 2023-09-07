/*
  Warnings:

  - You are about to drop the `user_preference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FoodsAvoidedBy" DROP CONSTRAINT "_FoodsAvoidedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_FoodsLikedBy" DROP CONSTRAINT "_FoodsLikedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesAvoidedBy" DROP CONSTRAINT "_RecipesAvoidedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesLikedBy" DROP CONSTRAINT "_RecipesLikedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserIngredients" DROP CONSTRAINT "_UserIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserMealPlans" DROP CONSTRAINT "_UserMealPlans_B_fkey";

-- DropForeignKey
ALTER TABLE "user_preference" DROP CONSTRAINT "user_preference_userId_fkey";

-- DropTable
DROP TABLE "user_preference";

-- CreateTable
CREATE TABLE "user_data" (
    "id" TEXT NOT NULL,
    "diet" TEXT,
    "max_calories" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_data_userId_key" ON "user_data"("userId");

-- CreateIndex
CREATE INDEX "user_data_diet_max_calories_idx" ON "user_data"("diet", "max_calories");

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodsLikedBy" ADD CONSTRAINT "_FoodsLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodsAvoidedBy" ADD CONSTRAINT "_FoodsAvoidedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesLikedBy" ADD CONSTRAINT "_RecipesLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesAvoidedBy" ADD CONSTRAINT "_RecipesAvoidedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMealPlans" ADD CONSTRAINT "_UserMealPlans_B_fkey" FOREIGN KEY ("B") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIngredients" ADD CONSTRAINT "_UserIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
