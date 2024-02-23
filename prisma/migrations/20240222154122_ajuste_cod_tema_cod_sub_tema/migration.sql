/*
  Warnings:

  - You are about to drop the column `subtema` on the `TemaSubtema` table. All the data in the column will be lost.
  - Added the required column `codSubTema` to the `TemaSubtema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codTema` to the `TemaSubtema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTema` to the `TemaSubtema` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemaSubtema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atendimentoId" INTEGER NOT NULL,
    "tema" TEXT NOT NULL,
    "codTema" TEXT NOT NULL,
    "subTema" TEXT NOT NULL,
    "codSubTema" TEXT NOT NULL,
    CONSTRAINT "TemaSubtema_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemaSubtema" ("atendimentoId", "id", "tema") SELECT "atendimentoId", "id", "tema" FROM "TemaSubtema";
DROP TABLE "TemaSubtema";
ALTER TABLE "new_TemaSubtema" RENAME TO "TemaSubtema";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
