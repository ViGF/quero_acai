-- CreateTable
CREATE TABLE "Cart" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "complements" TEXT[],
    "fruits" TEXT NOT NULL,
    "syrupsAndCreams" TEXT NOT NULL,
    "size" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
