-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "codComunic" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "recebeContato" INTEGER,
    "recebeSMS" INTEGER,
    "principal" INTEGER NOT NULL,
    "autorizaLigacao" INTEGER,
    "autorizaMensagem" INTEGER,
    CONSTRAINT "Email_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Email" ("autorizaLigacao", "autorizaMensagem", "clienteId", "codComunic", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS") SELECT "autorizaLigacao", "autorizaMensagem", "clienteId", "codComunic", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descEndereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "codBairro" INTEGER,
    "descBairro" TEXT NOT NULL,
    "codCid" INTEGER,
    "descCid" TEXT NOT NULL,
    "codEst" INTEGER,
    "descEst" TEXT NOT NULL,
    "codPais" INTEGER,
    "descPais" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "autorizaCorrespondencia" BOOLEAN,
    CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codCid", "codEst", "codPais", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "descPais", "id", "numero", "principal") SELECT "autorizaCorrespondencia", "cep", "clienteId", "codBairro", "codCid", "codEst", "codPais", "complemento", "descBairro", "descCid", "descEndereco", "descEst", "descPais", "id", "numero", "principal" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE TABLE "new_Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "codComunic" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "recebeContato" INTEGER,
    "recebeSMS" INTEGER,
    "principal" INTEGER,
    "autorizaLigacao" INTEGER,
    "autorizaMensagem" INTEGER,
    CONSTRAINT "Telefone_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Telefone" ("autorizaLigacao", "autorizaMensagem", "clienteId", "codComunic", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS") SELECT "autorizaLigacao", "autorizaMensagem", "clienteId", "codComunic", "descComunic", "id", "numero", "principal", "recebeContato", "recebeSMS" FROM "Telefone";
DROP TABLE "Telefone";
ALTER TABLE "new_Telefone" RENAME TO "Telefone";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
