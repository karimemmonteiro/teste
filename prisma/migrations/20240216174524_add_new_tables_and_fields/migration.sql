-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "produtorRural" BOOLEAN NOT NULL,
    "estudante" BOOLEAN NOT NULL,
    "lgpd" BOOLEAN
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "codComunic" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "autorizaMensagem" INTEGER NOT NULL,
    "recebeContato" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "recebeSMS" INTEGER NOT NULL,
    CONSTRAINT "Telefone_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "codComunic" INTEGER NOT NULL,
    "descComunic" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "autorizaMensagem" INTEGER NOT NULL,
    "recebeContato" INTEGER NOT NULL,
    "principal" INTEGER NOT NULL,
    "recebeSMS" INTEGER NOT NULL,
    CONSTRAINT "Email_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descEndereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "autorizaCorrespondencia" BOOLEAN,
    "cep" INTEGER,
    "codBairro" INTEGER,
    "codCid" INTEGER,
    "codEst" INTEGER,
    "codLogr" INTEGER,
    "codPais" INTEGER,
    "codigoMunicipioRM" INTEGER,
    "complemento" TEXT,
    "descBairro" TEXT,
    "descCid" TEXT,
    "descEst" TEXT,
    "descPais" TEXT,
    "endCorresp" TEXT,
    "endInternacional" TEXT,
    "indCorrespond" INTEGER,
    "isEmptyCep" BOOLEAN NOT NULL,
    "isEmptyDescBairro" BOOLEAN NOT NULL,
    "isEmptyDescEndereco" BOOLEAN NOT NULL,
    "isEmptyMunicipio" BOOLEAN NOT NULL,
    "numSeqEnd" INTEGER,
    "principal" INTEGER NOT NULL,
    "tpOperacao" INTEGER,
    CONSTRAINT "Endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
