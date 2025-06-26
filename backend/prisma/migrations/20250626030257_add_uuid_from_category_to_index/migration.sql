-- DropIndex
DROP INDEX "Category_userId_idx";

-- CreateIndex
CREATE INDEX "Category_userId_uuid_idx" ON "Category"("userId", "uuid");
