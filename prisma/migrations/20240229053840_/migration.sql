/*
  Warnings:

  - A unique constraint covering the columns `[id,githubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubUsername` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `githubId` INTEGER NOT NULL,
    ADD COLUMN `githubUsername` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_githubId_key` ON `User`(`id`, `githubId`);
