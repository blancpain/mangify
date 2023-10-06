/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `meals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "meals_profileId_key" ON "meals"("profileId");
