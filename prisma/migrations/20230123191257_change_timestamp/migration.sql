/*
  Warnings:

  - You are about to drop the column `Timestamp` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "originCurrency" TEXT NOT NULL,
    "originValue" INTEGER NOT NULL,
    "destinyCurrency" TEXT NOT NULL,
    "destinyValue" INTEGER NOT NULL,
    "conversionRate" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL
);
INSERT INTO "new_transactions" ("conversionRate", "destinyCurrency", "destinyValue", "id", "originCurrency", "originValue") SELECT "conversionRate", "destinyCurrency", "destinyValue", "id", "originCurrency", "originValue" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
