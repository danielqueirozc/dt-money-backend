-- CreateTable
CREATE TABLE "Tansaction" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tansaction_pkey" PRIMARY KEY ("id")
);
