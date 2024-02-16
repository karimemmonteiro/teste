/*
  Warnings:

  - Added the required column `senha` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "idSistema" INTEGER NOT NULL,
    "statusResponse" INTEGER NOT NULL,
    "textResponse" TEXT NOT NULL
);
INSERT INTO "new_User" ("cpf", "id", "idSistema", "refreshToken", "statusResponse", "textResponse", "token") SELECT "cpf", "id", "idSistema", "refreshToken", "statusResponse", "textResponse", "token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
