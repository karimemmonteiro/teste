/*
  Warnings:

  - Added the required column `codCid` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codEst` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Made the column `autorizaCorrespondencia` on table `Endereco` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `Endereco` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descCid` on table `Endereco` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descEst` on table `Endereco` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL,
    "descBairro" TEXT NOT NULL,
    "codBairro" TEXT NOT NULL,
    "descEndereco" TEXT NOT NULL,
    "codEndereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descEst" TEXT NOT NULL,
    "codEst" TEXT NOT NULL,
    "descCid" TEXT NOT NULL,
    "codCid" TEXT NOT NULL,
    "autorizaCorrespondencia" BOOLEAN NOT NULL,
    "complemento" TEXT,
    "principal" INTEGER NOT NULL,
    CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codEndereco", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "id", "numero", "principal") SELECT "autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codEndereco", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "id", "numero", "principal" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
