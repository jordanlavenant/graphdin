-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entityOneId" INTEGER NOT NULL,
    "entityTwoId" INTEGER NOT NULL,
    "typeRelationshipId" INTEGER NOT NULL,
    CONSTRAINT "Relationship_typeRelationshipId_fkey" FOREIGN KEY ("typeRelationshipId") REFERENCES "TypeRelationship" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "Relationship_entityOneId_fkey" FOREIGN KEY ("entityOneId") REFERENCES "Entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relationship_entityTwoId_fkey" FOREIGN KEY ("entityTwoId") REFERENCES "Entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Relationship" ("entityOneId", "entityTwoId", "id", "typeRelationshipId") SELECT "entityOneId", "entityTwoId", "id", "typeRelationshipId" FROM "Relationship";
DROP TABLE "Relationship";
ALTER TABLE "new_Relationship" RENAME TO "Relationship";
CREATE TABLE "new_TypeRelationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL DEFAULT 'desaffectée'
);
INSERT INTO "new_TypeRelationship" ("id", "label") SELECT "id", "label" FROM "TypeRelationship";
DROP TABLE "TypeRelationship";
ALTER TABLE "new_TypeRelationship" RENAME TO "TypeRelationship";
CREATE UNIQUE INDEX "TypeRelationship_label_key" ON "TypeRelationship"("label");
PRAGMA foreign_key_check("Relationship");
PRAGMA foreign_key_check("TypeRelationship");
PRAGMA foreign_keys=ON;
