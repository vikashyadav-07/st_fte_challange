-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL,
    "timer" INTEGER NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
