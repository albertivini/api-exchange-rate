-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originCurrency" TEXT NOT NULL,
    "originValue" INTEGER NOT NULL,
    "destinyCurrency" TEXT NOT NULL,
    "destinyValue" INTEGER NOT NULL,
    "conversionRate" INTEGER NOT NULL,
    "Timestamp" DATETIME NOT NULL
);
