-- CreateTable
CREATE TABLE "Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TypeRelationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entityOneId" INTEGER NOT NULL,
    "entityTwoId" INTEGER NOT NULL,
    "typeRelationshipId" INTEGER NOT NULL,
    CONSTRAINT "Relationship_typeRelationshipId_fkey" FOREIGN KEY ("typeRelationshipId") REFERENCES "TypeRelationship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relationship_entityOneId_fkey" FOREIGN KEY ("entityOneId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relationship_entityTwoId_fkey" FOREIGN KEY ("entityTwoId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
