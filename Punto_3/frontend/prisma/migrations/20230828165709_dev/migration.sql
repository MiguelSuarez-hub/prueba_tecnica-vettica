-- CreateTable
CREATE TABLE "Consult" (
    "id" SERIAL NOT NULL,
    "consultTime" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "headers" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "elapsedTime" INTEGER NOT NULL,
    "statusCodeMs" INTEGER NOT NULL,
    "statusCodeApi1" INTEGER NOT NULL,
    "statusCodeApi2" INTEGER NOT NULL,

    CONSTRAINT "Consult_pkey" PRIMARY KEY ("id")
);
