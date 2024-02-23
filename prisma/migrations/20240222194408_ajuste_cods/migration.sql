/*
  Warnings:

  - You are about to alter the column `codCid` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `codEst` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descEndereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "codBairro" INTEGER NOT NULL,
    "descBairro" TEXT NOT NULL,
    "codCid" INTEGER NOT NULL,
    "descCid" TEXT NOT NULL,
    "codEst" INTEGER NOT NULL,
    "descEst" TEXT NOT NULL,
    "codPais" INTEGER NOT NULL,
    "descPais" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "autorizaCorrespondencia" BOOLEAN NOT NULL,
    CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codCid", "codEst", "codPais", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "descPais", "id", "numero", "principal") SELECT "autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codCid", "codEst", "codPais", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "descPais", "id", "numero", "principal" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
