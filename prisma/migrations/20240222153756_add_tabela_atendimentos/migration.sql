/*
  Warnings:

  - You are about to drop the column `clienteId` on the `TemaSubtema` table. All the data in the column will be lost.
  - You are about to drop the column `atendente` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `canalAtendimento` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `funoIfAtendente` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `pendencias` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `projetoAcao` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `tema` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `tempoAtendimento` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `tipoAtendimento` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `atendimentoId` to the `TemaSubtema` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Atendimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "funoIfAtendente" TEXT NOT NULL,
    "atendente" TEXT NOT NULL,
    "tempoAtendimento" TEXT NOT NULL,
    "projetoAcao" TEXT NOT NULL,
    "tipoAtendimento" TEXT NOT NULL,
    "canalAtendimento" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "pendencias" TEXT NOT NULL,
    CONSTRAINT "Atendimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemaSubtema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atendimentoId" INTEGER NOT NULL,
    "tema" TEXT NOT NULL,
    "subtema" TEXT NOT NULL,
    CONSTRAINT "TemaSubtema_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TemaSubtema" ("id", "subtema", "tema") SELECT "id", "subtema", "tema" FROM "TemaSubtema";
DROP TABLE "TemaSubtema";
ALTER TABLE "new_TemaSubtema" RENAME TO "TemaSubtema";
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "produtorRural" BOOLEAN NOT NULL,
    "estudante" BOOLEAN NOT NULL,
    "lgpd" BOOLEAN
);
INSERT INTO "new_Cliente" ("cpf", "dataNascimento", "estudante", "id", "lgpd", "nome", "produtorRural") SELECT "cpf", "dataNascimento", "estudante", "id", "lgpd", "nome", "produtorRural" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
