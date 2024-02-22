/*
  Warnings:

  - You are about to drop the column `codEndereco` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `autorizaLigacao` to the `Telefone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codComunic` to the `Telefone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autorizaLigacao` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codComunic` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codPais` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descPais` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "codComunic" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "recebeContato" INTEGER NOT NULL,
    "recebeSMS" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "autorizaLigacao" INTEGER NOT NULL,
    "autorizaMensagem" INTEGER NOT NULL,
    CONSTRAINT "Telefone_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Telefone" ("autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS") SELECT "autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS" FROM "Telefone";
DROP TABLE "Telefone";
ALTER TABLE "new_Telefone" RENAME TO "Telefone";
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "codComunic" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "recebeContato" INTEGER NOT NULL,
    "recebeSMS" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "autorizaLigacao" INTEGER NOT NULL,
    "autorizaMensagem" INTEGER NOT NULL,
    CONSTRAINT "Email_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Email" ("autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS") SELECT "autorizaMensagem", "clienteId", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descEndereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "codBairro" TEXT NOT NULL,
    "descBairro" TEXT NOT NULL,
    "codCid" TEXT NOT NULL,
    "descCid" TEXT NOT NULL,
    "codEst" TEXT NOT NULL,
    "descEst" TEXT NOT NULL,
    "codPais" INTEGER NOT NULL,
    "descPais" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "autorizaCorrespondencia" BOOLEAN NOT NULL,
    CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codCid", "codEst", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "id", "numero", "principal") SELECT "autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codCid", "codEst", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "id", "numero", "principal" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
