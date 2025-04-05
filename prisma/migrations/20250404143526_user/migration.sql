/*
  Warnings:

  - Added the required column `device` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT;
