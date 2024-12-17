-- CreateTable
CREATE TABLE "StreetCache" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "StreetCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StreetCache_location_key" ON "StreetCache"("location");
