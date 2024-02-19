/*
  Warnings:

  - You are about to drop the column `codBairro` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `codCid` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `codEst` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `codLogr` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `codPais` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `codigoMunicipioRM` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `descPais` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `endCorresp` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `endInternacional` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `indCorrespond` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `isEmptyCep` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `isEmptyDescBairro` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `isEmptyDescEndereco` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `isEmptyMunicipio` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `numSeqEnd` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `tpOperacao` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the column `codComunic` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `codComunic` on the `Telefone` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "cep" INTEGER,
    "descBairro" TEXT,
    "descEndereco" TEXT NOT NULL,
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
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "autorizaMensagem" INTEGER NOT NULL,
    "recebeContato" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "recebeSMS" INTEGER NOT NULL,
    CONSTRAINT "Email_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Email" ("autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS") SELECT "autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
CREATE TABLE "new_Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "autorizaMensagem" INTEGER NOT NULL,
    "recebeContato" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "recebeSMS" INTEGER NOT NULL,
    CONSTRAINT "Telefone_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Telefone" ("autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS") SELECT "autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS" FROM "Telefone";
DROP TABLE "Telefone";
ALTER TABLE "new_Telefone" RENAME TO "Telefone";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
