/*
  Warnings:

  - Added the required column `experience` to the `mitras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mitras` ADD COLUMN `experience` VARCHAR(191) NOT NULL;
