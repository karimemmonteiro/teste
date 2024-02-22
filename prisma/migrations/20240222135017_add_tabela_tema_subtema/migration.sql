/*
  Warnings:

  - You are about to drop the column `unidadeOrganizacional` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `codBairro` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codEndereco` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Made the column `descBairro` on table `Endereco` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `funoIfAtendente` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TemaSubtema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "tema" TEXT NOT NULL,
    "subtema" TEXT NOT NULL,
    CONSTRAINT "TemaSubtema_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "cep" INTEGER,
    "descBairro" TEXT NOT NULL,
    "codBairro" TEXT NOT NULL,
    "descEndereco" TEXT NOT NULL,
    "codEndereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descEst" TEXT,
    "descCid" TEXT,
    "autorizaCorrespondencia" BOOLEAN,
    "complemento" TEXT,
    "principal" INTEGER NOT NULL,
    CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("autorizaCorrespondencia", "cep", "clienteId", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "id", "numero", "principal") SELECT "autorizaCorrespondencia", "cep", "clienteId", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "id", "numero", "principal" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "produtorRural" BOOLEAN NOT NULL,
    "estudante" BOOLEAN NOT NULL,
    "lgpd" BOOLEAN,
    "status" TEXT NOT NULL,
    "funoIfAtendente" TEXT NOT NULL,
    "atendente" TEXT NOT NULL,
    "tempoAtendimento" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "projetoAcao" TEXT NOT NULL,
    "tipoAtendimento" TEXT NOT NULL,
    "canalAtendimento" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "pendencias" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("atendente", "canalAtendimento", "cpf", "dataNascimento", "descricao", "estudante", "id", "lgpd", "nome", "pendencias", "produtorRural", "projetoAcao", "status", "tema", "tempoAtendimento", "tipoAtendimento") SELECT "atendente", "canalAtendimento", "cpf", "dataNascimento", "descricao", "estudante", "id", "lgpd", "nome", "pendencias", "produtorRural", "projetoAcao", "status", "tema", "tempoAtendimento", "tipoAtendimento" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
