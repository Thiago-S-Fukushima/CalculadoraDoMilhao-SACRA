/*
  Warnings:

  - You are about to drop the `calculation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."calculation" DROP CONSTRAINT "calculation_user_id_fkey";

-- DropTable
DROP TABLE "public"."calculation";

-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Simulation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "aporteInicial" DOUBLE PRECISION NOT NULL,
    "aporteMensal" DOUBLE PRECISION NOT NULL,
    "taxaJuros" DOUBLE PRECISION NOT NULL,
    "resultados" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Simulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Calculation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "calculation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initial_contribution" DOUBLE PRECISION NOT NULL,
    "monthly_contribution" DOUBLE PRECISION NOT NULL,
    "monthly_rate" DOUBLE PRECISION NOT NULL,
    "months_to_reach_goal" INTEGER NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Simulation" ADD CONSTRAINT "Simulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Calculation" ADD CONSTRAINT "Calculation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
