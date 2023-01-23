/*
  Warnings:

  - You are about to alter the column `conversionRate` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `destinyValue` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `originValue` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "originCurrency" TEXT NOT NULL,
    "originValue" REAL NOT NULL,
    "destinyCurrency" TEXT NOT NULL,
    "destinyValue" REAL NOT NULL,
    "conversionRate" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL
);
INSERT INTO "new_transactions" ("conversionRate", "destinyCurrency", "destinyValue", "id", "originCurrency", "originValue", "timestamp", "userId") SELECT "conversionRate", "destinyCurrency", "destinyValue", "id", "originCurrency", "originValue", "timestamp", "userId" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
