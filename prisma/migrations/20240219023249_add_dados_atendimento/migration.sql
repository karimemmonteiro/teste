/*
  Warnings:

  - Added the required column `atendente` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canalAtendimento` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricaoAtendimento` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendencias` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projetoAcao` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tema` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempoAtendimento` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoAtendimento` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadeOrganizacional` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
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
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "dataCriacaoRelatorio" TEXT NOT NULL,
    "descricaoStatusReceita" TEXT NOT NULL,
    "descPorte" TEXT NOT NULL,
    "quantidadeFuncionarios" INTEGER NOT NULL,
    "descNaturezaJuridica" TEXT NOT NULL,
    "atividade" TEXT NOT NULL,
    "atendente" TEXT NOT NULL,
    "tempoAtendimento" TEXT NOT NULL,
    "unidadeOrganizacional" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "projetoAcao" TEXT NOT NULL,
    "tipoAtendimento" TEXT NOT NULL,
    "canalAtendimento" TEXT NOT NULL,
    "descricaoAtendimento" TEXT NOT NULL,
    "pendencias" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("atividade", "cnpj", "cpf", "dataCriacaoRelatorio", "dataNascimento", "descNaturezaJuridica", "descPorte", "descricaoStatusReceita", "estudante", "id", "lgpd", "nome", "nomeFantasia", "produtorRural", "quantidadeFuncionarios", "razaoSocial", "status") SELECT "atividade", "cnpj", "cpf", "dataCriacaoRelatorio", "dataNascimento", "descNaturezaJuridica", "descPorte", "descricaoStatusReceita", "estudante", "id", "lgpd", "nome", "nomeFantasia", "produtorRural", "quantidadeFuncionarios", "razaoSocial", "status" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
