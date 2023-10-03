/*
  Warnings:

  - You are about to drop the `user_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RecipesAvoidedBy" DROP CONSTRAINT "_RecipesAvoidedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesAvoidedBy" DROP CONSTRAINT "_RecipesAvoidedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesLikedBy" DROP CONSTRAINT "_RecipesLikedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipesLikedBy" DROP CONSTRAINT "_RecipesLikedBy_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserIngredients" DROP CONSTRAINT "_UserIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserMealPlans" DROP CONSTRAINT "_UserMealPlans_B_fkey";

-- DropForeignKey
ALTER TABLE "user_data" DROP CONSTRAINT "user_data_userId_fkey";

-- DropTable
DROP TABLE "user_data";

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "diet" TEXT,
    "sex" "Sex",
    "activity_level" "ActivityLevel" NOT NULL DEFAULT 'MODERATE',
    "goal" "Goal" DEFAULT 'MAINTAIN',
    "age" INTEGER,
    "height" INTEGER,
    "weight" INTEGER,
    "intolerances" TEXT[],
    "favorite_cuisines" TEXT[],
    "meals_per_day" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE INDEX "profile_diet_sex_activity_level_goal_height_weight_idx" ON "profile"("diet", "sex", "activity_level", "goal", "height", "weight");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesLikedBy" ADD CONSTRAINT "_RecipesLikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesLikedBy" ADD CONSTRAINT "_RecipesLikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesAvoidedBy" ADD CONSTRAINT "_RecipesAvoidedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipesAvoidedBy" ADD CONSTRAINT "_RecipesAvoidedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMealPlans" ADD CONSTRAINT "_UserMealPlans_B_fkey" FOREIGN KEY ("B") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIngredients" ADD CONSTRAINT "_UserIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
