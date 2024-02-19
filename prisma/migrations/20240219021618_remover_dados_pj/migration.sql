/*
  Warnings:

  - You are about to drop the `DadosPj` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `atividade` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataCriacaoRelatorio` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descNaturezaJuridica` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descPorte` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricaoStatusReceita` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeFantasia` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeFuncionarios` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razaoSocial` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DadosPj";
PRAGMA foreign_keys=on;

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
    "atividade" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("cpf", "dataNascimento", "estudante", "id", "lgpd", "nome", "produtorRural", "status") SELECT "cpf", "dataNascimento", "estudante", "id", "lgpd", "nome", "produtorRural", "status" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
