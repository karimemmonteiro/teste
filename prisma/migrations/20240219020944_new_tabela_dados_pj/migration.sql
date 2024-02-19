/*
  Warnings:

  - Added the required column `status` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "DadosPj" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "dataCriacaoRelatorio" TEXT NOT NULL,
    "descricaoStatusReceita" TEXT NOT NULL,
    "descPorte" TEXT NOT NULL,
    "quantidadeFuncionarios" INTEGER NOT NULL,
    "descNaturezaJuridica" TEXT NOT NULL,
    "atividade" TEXT NOT NULL,
    CONSTRAINT "DadosPj_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "produtorRural" BOOLEAN NOT NULL,
    "estudante" BOOLEAN NOT NULL,
    "lgpd" BOOLEAN,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("cpf", "dataNascimento", "estudante", "id", "lgpd", "nome", "produtorRural") SELECT "cpf", "dataNascimento", "estudante", "id", "lgpd", "nome", "produtorRural" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
