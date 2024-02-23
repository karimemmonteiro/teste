/*
  Warnings:

  - You are about to drop the column `atividade` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacaoRelatorio` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descNaturezaJuridica` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descPorte` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descricaoStatusReceita` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `nomeFantasia` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `quantidadeFuncionarios` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `razaoSocial` on the `Cliente` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Pfpj" (
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
    CONSTRAINT "Pfpj_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "status" TEXT NOT NULL,
    "atendente" TEXT NOT NULL,
    "tempoAtendimento" TEXT NOT NULL,
    "unidadeOrganizacional" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "projetoAcao" TEXT NOT NULL,
    "tipoAtendimento" TEXT NOT NULL,
    "canalAtendimento" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "pendencias" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("atendente", "canalAtendimento", "cpf", "dataNascimento", "descricao", "estudante", "id", "lgpd", "nome", "pendencias", "produtorRural", "projetoAcao", "status", "tema", "tempoAtendimento", "tipoAtendimento", "unidadeOrganizacional") SELECT "atendente", "canalAtendimento", "cpf", "dataNascimento", "descricao", "estudante", "id", "lgpd", "nome", "pendencias", "produtorRural", "projetoAcao", "status", "tema", "tempoAtendimento", "tipoAtendimento", "unidadeOrganizacional" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
