/*
  Warnings:

  - Added the required column `answeredCount` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImage` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryColor` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "answeredCount" INTEGER NOT NULL,
ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "primaryColor" TEXT NOT NULL;
