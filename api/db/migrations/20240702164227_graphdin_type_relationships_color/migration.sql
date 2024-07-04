/*
  Warnings:

  - Added the required column `color` to the `TypeRelationship` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TypeRelationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_TypeRelationship" ("id", "label") SELECT "id", "label" FROM "TypeRelationship";
DROP TABLE "TypeRelationship";
ALTER TABLE "new_TypeRelationship" RENAME TO "TypeRelationship";
CREATE UNIQUE INDEX "TypeRelationship_label_key" ON "TypeRelationship"("label");
CREATE UNIQUE INDEX "TypeRelationship_color_key" ON "TypeRelationship"("color");
PRAGMA foreign_key_check("TypeRelationship");
PRAGMA foreign_keys=ON;
