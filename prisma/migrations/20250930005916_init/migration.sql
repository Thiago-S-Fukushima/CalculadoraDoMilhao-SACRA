-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."calculation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "calculation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initial_contribution" DOUBLE PRECISION NOT NULL,
    "monthly_contribution" DOUBLE PRECISION NOT NULL,
    "monthly_rate" DOUBLE PRECISION NOT NULL,
    "months_to_reach_goal" INTEGER NOT NULL,

    CONSTRAINT "calculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- AddForeignKey
ALTER TABLE "public"."calculation" ADD CONSTRAINT "calculation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
